export interface IPortfolio {
  id: string;
  title: string;
  default?: boolean;
  created_at: number;
  refreshed_at: number;
  language: string;
}
