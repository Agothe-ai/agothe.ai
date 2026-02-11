// Advanced API client with automatic retries, caching, and error handling

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
  cache?: boolean;
  cacheDuration?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private duration: number;

  constructor(duration: number = 5 * 60 * 1000) {
    this.duration = duration;
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const age = Date.now() - cached.timestamp;
    if (age > this.duration) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }
}

export class ApiClient {
  private config: Required<ApiConfig>;
  private cache: ApiCache;

  constructor(config: ApiConfig) {
    this.config = {
      baseURL: config.baseURL,
      timeout: config.timeout ?? 30000,
      retries: config.retries ?? 3,
      retryDelay: config.retryDelay ?? 1000,
      headers: config.headers ?? {},
      cache: config.cache ?? false,
      cacheDuration: config.cacheDuration ?? 5 * 60 * 1000,
    };
    this.cache = new ApiCache(this.config.cacheDuration);
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getCacheKey(url: string, options?: RequestInit): string {
    return `${url}-${JSON.stringify(options)}`;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async fetchWithRetry(
    url: string,
    options: RequestInit
  ): Promise<Response> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(
          url,
          options,
          this.config.timeout
        );
        return response;
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < this.config.retries) {
          await this.sleep(this.config.retryDelay * (attempt + 1));
        }
      }
    }

    throw lastError;
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const cacheKey = this.getCacheKey(url, options);

    // Check cache for GET requests
    if (this.config.cache && (!options.method || options.method === 'GET')) {
      const cached = this.cache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const headers = {
      'Content-Type': 'application/json',
      ...this.config.headers,
      ...(options.headers as Record<string, string>),
    };

    const fetchOptions: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await this.fetchWithRetry(url, fetchOptions);

      if (!response.ok) {
        const error: ApiError = {
          message: response.statusText,
          status: response.status,
        };

        try {
          error.data = await response.json();
        } catch {
          error.data = await response.text();
        }

        throw error;
      }

      const data = await response.json();
      const result: ApiResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };

      // Cache successful GET requests
      if (this.config.cache && (!options.method || options.method === 'GET')) {
        this.cache.set(cacheKey, result);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async get<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
    return response.data;
  }

  async post<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const response = await this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async put<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const response = await this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async delete<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
    return response.data;
  }

  clearCache(): void {
    this.cache.clear();
  }

  setHeader(key: string, value: string): void {
    this.config.headers[key] = value;
  }

  removeHeader(key: string): void {
    delete this.config.headers[key];
  }
}

export const createApiClient = (config: ApiConfig) => new ApiClient(config);
