import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { ElectionsComponent } from "./elections/elections.component";
import { CandidatesComponent } from "./candidates/candidates.component";
import { VotersComponent } from "./voters/voters.component";

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
    path: 'candidates',
    component: CandidatesComponent
  },
  {
    path: 'voters',
    component: VotersComponent
  }
]