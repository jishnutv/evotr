import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { ElectionsComponent } from "./elections/elections.component";
import { CandidatesComponent } from "./candidates/candidates.component";
import { VotersComponent } from "./voters/voters.component";
import { CreateElectionComponent } from "./create-election/create-election.component";
import { CreateCandidateComponent } from "./create-candidate/create-candidate.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminComponent,
  },
  {
    path: 'elections',
    component: ElectionsComponent
  },
  {
    path: 'elections/create',
    component: CreateElectionComponent
  },
  {
    path: 'elections/:id',
    component: CandidatesComponent
  },
  {
    path: 'create-candidate',
    component: CreateCandidateComponent
  },
  {
    path: 'voters',
    component: VotersComponent
  }
]