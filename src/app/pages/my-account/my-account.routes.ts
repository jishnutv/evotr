import { Routes } from "@angular/router"
import { MyAccountComponent } from "./my-account.component"
import { ProfileComponent } from "./profile/profile.component"
import { RecentVotesComponent } from "./recent-votes/recent-votes.component"
import { ChangePasswordComponent } from "./change-password/change-password.component"
import { EditProfileComponent } from "./edit-profile/edit-profile.component"


export const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {
        path: '',
        redirectTo: '/my-account/profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'edit-profile/:id',
        component: EditProfileComponent
      },
      {
        path: 'recent-votes',
        component: RecentVotesComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  }
]