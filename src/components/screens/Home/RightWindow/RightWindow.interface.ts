import {
  DealerConfig,
  DealerProductConfig,
  MarkupButtonConfig
} from '../Home.interface'

export interface IRightWindow {
  allDealers: Array<DealerConfig>
  setDealersProductsList: (currentProducts: Array<DealerProductConfig>) => void
  dealersProductsList: Array<DealerProductConfig>
  onClickMarkup: ({
    dealer_product_id,
    dealer_id,
    status
  }: MarkupButtonConfig) => void
}
