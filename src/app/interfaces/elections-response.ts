import { Election } from "./election"

export interface ElectionsResponse {
  success: boolean
  data: Election[]
}