export interface CompanyProductConfig {
  article: string
  name: string
  ean_13: string
  cost: number
  recommended_price: number
  category_id: number
  ozon_name: string
  name_1c: string
  wb_name: string
  ozon_article: string
  wb_article_td: string
  ym_article: string
  id: number
}

export interface DealerProductConfig {
  product_key: number
  price: number
  product_url: string
  product_name: string
  date: string
  dealer_id: number
  status: string
  id: number
}

export interface AllDealers {
  name: string
  dealer_product: Array<DealerProductConfig>
  id: number
}

export interface DealerConfig {
  name: string
  dealer_product: Array<DealerProductConfig>
  id: string
}

export interface SelectedOptionConfig {
  value: string
  label: string
}

export interface MarkupButtonConfig {
  dealer_product_id: number
  dealer_id?: number
  status: 'markup' | 'unclaimed' | 'postponed' | 'waiting'
}
