import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { TrainerpanelComponent } from './trainerpanel/trainerpanel.component';
import { UserrequestComponent } from './userrequest/userrequest.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { MembershipComponent } from './membership/membership.component';
import { EditcostsComponent } from './editcosts/editcosts.component';
import { OurteamComponent } from './ourteam/ourteam.component';
import { IndividualrequestComponent } from './individualrequest/individualrequest.component';
import { ChangeprofilepicComponent } from './changeprofilepic/changeprofilepic.component';
import { GtrainingsComponent } from './gtrainings/gtrainings.component';
import { AddtrainingComponent } from './addtraining/addtraining.component';
import { PersonaltrainingComponent } from './personaltraining/personaltraining.component';
import { GymfacilitiesComponent } from './gymfacilities/gymfacilities.component';
import { FooterComponent } from './footer/footer.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { CheckmembershipComponent } from './checkmembership/checkmembership.component';
import { VerifymailComponent } from './verifymail/verifymail.component';
import { IndividualTrainerPageComponent } from './individual-trainer-page/individual-trainer-page.component';
import { IndividualTrainingUserComponent } from './individual-training-user/individual-training-user.component';
import { GroupTrainerComponent } from './group-trainer/group-trainer.component';
import { GroupUserComponent } from './group-user/group-user.component';
import { ProbaqrComponent } from './probaqr/probaqr.component';
import { QrscanerprobaComponent } from './qrscanerproba/qrscanerproba.component';
import { ProfilecheckerComponent } from './profilechecker/profilechecker.component';
import { MycodeComponent } from './mycode/mycode.component';
import { CaptureprofilepictureComponent } from './captureprofilepicture/captureprofilepicture.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ContactComponent,
    AdminpanelComponent,
    TrainerpanelComponent,
    UserrequestComponent,
    PersonnelComponent,
    MembershipComponent,
    EditcostsComponent,
    OurteamComponent,
    IndividualrequestComponent,
    ChangeprofilepicComponent,
    GtrainingsComponent,
    AddtrainingComponent,
    PersonaltrainingComponent,
    GymfacilitiesComponent,
    FooterComponent,
    NewsletterComponent,
    CheckmembershipComponent,
    VerifymailComponent,
    IndividualTrainerPageComponent,
    IndividualTrainingUserComponent,
    GroupTrainerComponent,
    GroupUserComponent,
    ProbaqrComponent,
    QrscanerprobaComponent,
    ProfilecheckerComponent,
    MycodeComponent,
    CaptureprofilepictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
