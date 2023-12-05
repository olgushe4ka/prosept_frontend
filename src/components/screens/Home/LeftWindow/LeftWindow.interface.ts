import { CompanyProductConfig } from '../Home.interface'

export interface LeftWindowConfig {
  allCompanyProducts: Array<CompanyProductConfig>
  selectedGood: number | null
  setSelectedGood: (good: number | null) => void
  isLoading: boolean
}
