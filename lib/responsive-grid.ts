// Advanced responsive grid system utilities and breakpoint management

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const getBreakpoint = (): Breakpoint => {
  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

export const useBreakpoint = (callback: (breakpoint: Breakpoint) => void) => {
  let currentBreakpoint = getBreakpoint();
  
  const handleResize = () => {
    const newBreakpoint = getBreakpoint();
    if (newBreakpoint !== currentBreakpoint) {
      currentBreakpoint = newBreakpoint;
      callback(newBreakpoint);
    }
  };
  
  window.addEventListener('resize', handleResize);
  callback(currentBreakpoint);
  
  return () => window.removeEventListener('resize', handleResize);
};

export interface GridConfig {
  columns: number | Record<Breakpoint, number>;
  gap?: string | Record<Breakpoint, string>;
  minItemWidth?: string;
}

export const createResponsiveGrid = (container: HTMLElement, config: GridConfig) => {
  const applyGrid = () => {
    const breakpoint = getBreakpoint();
    
    let columns: number;
    if (typeof config.columns === 'number') {
      columns = config.columns;
    } else {
      columns = config.columns[breakpoint] ?? 1;
    }
    
    let gap: string;
    if (!config.gap) {
      gap = '1rem';
    } else if (typeof config.gap === 'string') {
      gap = config.gap;
    } else {
      gap = config.gap[breakpoint] ?? '1rem';
    }
    
    if (config.minItemWidth) {
      container.style.gridTemplateColumns = `repeat(auto-fit, minmax(${config.minItemWidth}, 1fr))`;
    } else {
      container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
    
    container.style.display = 'grid';
    container.style.gap = gap;
  };
  
  applyGrid();
  return useBreakpoint(applyGrid);
};

export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface ContainerConfig {
  maxWidth?: string | Record<Breakpoint, string>;
  padding?: string | Record<Breakpoint, string>;
}

export const createResponsiveContainer = (element: HTMLElement, config: ContainerConfig = {}) => {
  const applyStyles = () => {
    const breakpoint = getBreakpoint();
    
    let maxWidth: string;
    if (!config.maxWidth) {
      maxWidth = `${breakpoints[breakpoint]}px`;
    } else if (typeof config.maxWidth === 'string') {
      maxWidth = config.maxWidth;
    } else {
      maxWidth = config.maxWidth[breakpoint] ?? '100%';
    }
    
    let padding: string;
    if (!config.padding) {
      padding = '1rem';
    } else if (typeof config.padding === 'string') {
      padding = config.padding;
    } else {
      padding = config.padding[breakpoint] ?? '1rem';
    }
    
    element.style.maxWidth = maxWidth;
    element.style.padding = padding;
    element.style.marginLeft = 'auto';
    element.style.marginRight = 'auto';
  };
  
  applyStyles();
  return useBreakpoint(applyStyles);
};

export const isMobile = () => {
  const bp = getBreakpoint();
  return bp === 'xs' || bp === 'sm';
};

export const isTablet = () => {
  const bp = getBreakpoint();
  return bp === 'md' || bp === 'lg';
};

export const isDesktop = () => {
  const bp = getBreakpoint();
  return bp === 'xl' || bp === '2xl';
};

export const matchMedia = (query: string): boolean => {
  return window.matchMedia(query).matches;
};

export const prefersReducedMotion = (): boolean => {
  return matchMedia('(prefers-reduced-motion: reduce)');
};

export const prefersDarkMode = (): boolean => {
  return matchMedia('(prefers-color-scheme: dark)');
};

export const watchMediaQuery = (query: string, callback: (matches: boolean) => void) => {
  const mediaQuery = window.matchMedia(query);
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  mediaQuery.addEventListener('change', handleChange);
  callback(mediaQuery.matches);
  
  return () => mediaQuery.removeEventListener('change', handleChange);
};
