import { CRYPTOCURRENCY, STOCK } from '~constants/assets';

export interface IAsset {
  id: string;
  uuid: string;
  title: string;
  type: STOCK | CRYPTOCURRENCY;
  symbol: string;
  currentPrice: number;
  averagePrice: number;
  diffInPercent: number;
  diffInValue: number;
  invested: number;
  share: number;
  created_at: number;
  refreshed_at: number;
  portfolioId: string;
  count: number;
  language: string;
}

export interface ISuggestedAsset {
  uuid?: string;
  description: string;
  symbol: string;
  type: STOCK | CRYPTOCURRENCY;
}

export interface IPurchase {
  id: string;
  assetId: string;
  portfolioId: string;
  count: number;
  price: number;
  created_at: number;
  language: string;
}
