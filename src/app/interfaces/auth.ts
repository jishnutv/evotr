import { Voter } from "./voter"

export interface Auth {
  access_token: string,
  token_type: string,
  duration: number
  data: Voter
}
