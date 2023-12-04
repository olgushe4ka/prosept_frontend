import axios, { AxiosInstance } from 'axios'

import { BASE_URL } from '../constants/api.constants'

interface MarkupDealerProductConfig {
  product_id: number
  status: 'markup' | 'unclaimed' | 'postponed' | 'waiting'
  dealer_product_id: number
  dealer_id: number
}

class Api {
  axios: AxiosInstance
  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getAllCompanyProducts() {
    return this.axios.get('/company/products/')
  }

  getAllDealers() {
    return this.axios.get('/dealers')
  }

  markupDealerProduct(params: MarkupDealerProductConfig) {
    return this.axios.put(
      `/dealers/products/${params.dealer_product_id}/${params.status}/`,
      {
        product_id: params.product_id,
        dealer_id: params.dealer_id
      }
    )
  }

  getAllDealersProducts() {
    return this.axios.get(
      `/dealers/products/${status ? '?status=' + status : ''}`
    )
  }
}

export default new Api()
