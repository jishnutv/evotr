import { Candidate } from "./candidate"

export interface Election {
  id: string
  title: string
  image: string
  status: string
  candidates: Candidate[]
}