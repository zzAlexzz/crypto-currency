export interface CurrencyInfo {
  id: string; // The primary key or unique identifier (e.g., "BTC", "USD")
  name: string; // Display name of the currency (e.g., "Bitcoin", "Euro")
  symbol: string; // Symbol for display (e.g., "BTC", "$")
  code?: string; // Fiat currency code (ISO 4217), undefined for crypto
  canPurchase?: boolean; // Whether this currency can be purchased (for demo filter)
}
