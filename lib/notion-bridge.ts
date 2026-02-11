import { ApiClient } from './api-client';

export interface NotionConfig {
  apiKey: string;
  databaseIds: {
    facts: string;
    concepts: string;
    hypotheses: string;
    decisions: string;
    projects: string;
    handoffs: string;
  };
  version?: string;
}

export class NotionBridge {
  private client: ApiClient;
  private databaseIds: NotionConfig['databaseIds'];

  constructor(config: NotionConfig) {
    this.databaseIds = config.databaseIds;
    this.client = new ApiClient({
      baseURL: 'https://api.notion.com/v1',
      headers: {
        'Authorization': `Bearer \${config.apiKey}`,
        'Notion-Version': config.version || '2022-06-28',
        'Content-Type': 'application/json',
      },
    });
  }

  async queryDatabase(databaseId: string, filter?: any) {
    return this.client.post(\`/databases/\${databaseId}/query\`, { filter });
  }

  async createPage(parentDatabaseId: string, properties: any) {
    return this.client.post('/pages', {
      parent: { database_id: parentDatabaseId },
      properties,
    });
  }

  async updatePage(pageId: string, properties: any) {
    return this.client.patch(\`/pages/\${pageId}\`, { properties });
  }

  // Capability 8: Bidirectional Notion Sync
  async syncFacts(facts: any[]) {
    for (const fact of facts) {
      await this.createPage(this.databaseIds.facts, fact.properties);
    }
  }

  async syncConcepts(concepts: any[]) {
    for (const concept of concepts) {
      await this.createPage(this.databaseIds.concepts, concept.properties);
    }
  }

  async syncHypotheses(hypotheses: any[]) {
    for (const hypothesis of hypotheses) {
      await this.createPage(this.databaseIds.hypotheses, hypothesis.properties);
    }
  }

  async syncDecisions(decisions: any[]) {
    for (const decision of decisions) {
      await this.createPage(this.databaseIds.decisions, decision.properties);
    }
  }

  async syncProjects(projects: any[]) {
    for (const project of projects) {
      await this.createPage(this.databaseIds.projects, project.properties);
    }
  }

  // Session Handoff Persistence
  async saveHandoff(handoffData: { title: string; content: string; metrics: any }) {
    return this.createPage(this.databaseIds.handoffs, {
      Title: { title: [{ text: { content: handoffData.title } }] },
      Content: { rich_text: [{ text: { content: handoffData.content } }] },
      Metrics: { rich_text: [{ text: { content: JSON.stringify(handoffData.metrics) } }] },
      Timestamp: { date: { start: new Date().toISOString() } },
    });
  }
}
