import {
  CompanyProductConfig,
  DealerProductConfig,
  MarkupButtonConfig
} from '../Home/Home.interface'

export interface ResultsConfig {
  allDealersProducts: Array<DealerProductConfig>
  onClickMarkup: ({
    dealer_product_id,
    status
  }: MarkupButtonConfig) => Promise<void> | undefined
  allCompanyProducts: Array<CompanyProductConfig>
  onResultClick: (type: 'result' | 'statistic') => void
}
