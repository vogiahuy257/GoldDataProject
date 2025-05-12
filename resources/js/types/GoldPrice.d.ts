export interface GoldPrice {
  id: number;
  source: 'SJC' | 'DOJI' | 'PNJ' | string;
  gold_type: string | null;
  buy_price: string | null;
  sell_price: string | null;
  date: string | null;
  time: string | null;
  scraped_at: string | null;
}
