import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtrainingComponent } from './addtraining/addtraining.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { CaptureprofilepictureComponent } from './captureprofilepicture/captureprofilepicture.component';
import { ChangeprofilepicComponent } from './changeprofilepic/changeprofilepic.component';
import { CheckmembershipComponent } from './checkmembership/checkmembership.component';
import { ContactComponent } from './contact/contact.component';
import { EditcostsComponent } from './editcosts/editcosts.component';
import { FooterComponent } from './footer/footer.component';
import { GroupTrainerComponent } from './group-trainer/group-trainer.component';
import { GroupUserComponent } from './group-user/group-user.component';
import { GtrainingsComponent } from './gtrainings/gtrainings.component';
import { GymfacilitiesComponent } from './gymfacilities/gymfacilities.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IndividualTrainerPageComponent } from './individual-trainer-page/individual-trainer-page.component';
import { IndividualTrainingUserComponent } from './individual-training-user/individual-training-user.component';
import { IndividualrequestComponent } from './individualrequest/individualrequest.component';
import { LoginComponent } from './login/login.component';
import { MembershipComponent } from './membership/membership.component';
import { MycodeComponent } from './mycode/mycode.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { OurteamComponent } from './ourteam/ourteam.component';
import { PersonaltrainingComponent } from './personaltraining/personaltraining.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { ProbaqrComponent } from './probaqr/probaqr.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilecheckerComponent } from './profilechecker/profilechecker.component';
import { QrscanerprobaComponent } from './qrscanerproba/qrscanerproba.component';
import { RegisterComponent } from './register/register.component';
import { TrainerpanelComponent } from './trainerpanel/trainerpanel.component';
import { UserrequestComponent } from './userrequest/userrequest.component';
import { VerifymailComponent } from './verifymail/verifymail.component';

const routes: Routes = [
  {path:'', component:HomepageComponent},
  {path:'homepage', component:HomepageComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileComponent},
  {path:'contact', component:ContactComponent},
  {path:'verify', component: VerifymailComponent},
  {path:'trainerpanel', component:TrainerpanelComponent},
  {path:'userrequest', component:UserrequestComponent},
  {path:'personnel', component:PersonnelComponent},
  {path:'membership', component:MembershipComponent},
  {path:'editcost', component:EditcostsComponent},
  {path:'ourteam', component:OurteamComponent},
  {path:'changeprofilepic', component:ChangeprofilepicComponent},
  {path:'gtrainings', component:GtrainingsComponent},
  {path:'addtraining', component:AddtrainingComponent},
  {path:'personaltraining', component:PersonaltrainingComponent},
  {path:'gymfacilities', component:GymfacilitiesComponent},
  {path:'footer', component: FooterComponent},
  {path:'newsletter', component: NewsletterComponent},
  {path:'checkmemberships', component: CheckmembershipComponent},
  {path:'verifymail', component : VerifymailComponent},
  {path:'individualRequest', component : IndividualrequestComponent},
  {path:'individualTrainerPage', component : IndividualTrainerPageComponent},
  {path:'individualTrainingUser', component : IndividualTrainingUserComponent},
  {path:'groupTrainer', component : GroupTrainerComponent},
  {path:'groupUser', component : GroupUserComponent},
  {path:'probaqr', component: ProbaqrComponent},
  {path:'qrscanerproba', component : QrscanerprobaComponent},
  {path:'profilechecker', component : ProfilecheckerComponent},
  {path:'mycode', component : MycodeComponent},
  {path:'captureprofilepicture', component : CaptureprofilepictureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
