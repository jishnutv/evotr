import { Candidate } from "./candidate"

export interface Election {
  title: string
  image: string
  status: string
  candidates: Candidate[]
}