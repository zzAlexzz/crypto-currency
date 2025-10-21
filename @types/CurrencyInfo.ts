export interface CurrencyInfo {
  id: string; // The db primary key from server (e.g., "BTC", "USD")
  name: string; // The display name of the currency (e.g., "Bitcoin", "Euro")
  symbol: string; // The display symbol (e.g., "BTC", "$")
  code?: string; // Fiat currency code (ISO 4217), undefined for crypto
  canPurchase?: boolean; // Whether this currency can be purchased (for demo filter)
}
