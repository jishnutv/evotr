import { Election } from "./election"

export interface Candidate {
  id: string
  fname: string
  lname: string
  image: string
  email: string
  phone: any
  created_at: string
  updated_at: string
  status: string
  election: Election,
  total_votes: number
}