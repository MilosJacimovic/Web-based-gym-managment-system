import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { ServicesService } from '../services.service';



@Component({
  selector: 'app-individualrequest',
  templateUrl: './individualrequest.component.html',
  styleUrls: ['./individualrequest.component.css']
})
export class IndividualrequestComponent implements OnInit {

  constructor(private router : Router, private service : ServicesService) { }

  ngOnInit(): void {
    this.user = new User;
    this.myUsername = null;
    this.trainer = "";
    this.numOfTrainings = "";
    this.finished = false;
    this.makeNewRequest = false;
    this.alreadyOneTraining = "You already have one personal training active. You can check all your trainings in your profile tab."
    this.waitMessage = "You already have one personal training pending, please wait for your trainer to either accept or decline it. Afterwads, you can request a new personal training."
    this.personalTrainers = new Array<User>();
    let isLogged = localStorage.getItem("LoggedUser");
    
    if(isLogged !== "logged") this.router.navigate(['/homepage']);
    else
    {
      this.myUsername = localStorage.getItem("myUsername");
      let makeNewRequest : boolean;
      this.canIMakeNewPersonalRequest();
    
      this.getMySelf();
      this.getPersonalTrainers();
    }
  }

  myUsername;
  trainer;
  personalTrainers : Array<User>;
  info;
  errorMessage;
  okMessage;
  numOfTrainings;
  waitMessage;
  user : User;
  finished : boolean;

  alreadyOneTraining;
  makeNewRequest;

  canIMakeNewPersonalRequest()
  {
    this.service.canIMakeNewPersonalRequest(this.myUsername).subscribe((ob)=>
    {
      if(ob['request'] == 'ok') this.makeNewRequest = true;
      if(ob['request'] == 'no') this.makeNewRequest = false;
    })
  }

  getPersonalTrainers()
  {
    this.service.getPersonalTrainers().subscribe((ob : Array<User>)=>
    {
      if(ob != null)
      {
        this.personalTrainers = ob;
      }
    })
  }

 getMySelf()
  {
    this.service.getOneUser(this.myUsername).subscribe((ob : User)=>
    {
      if(ob != null) 
      {
       this.user = ob;
      }
    });
  }

  individualTrainingRequest()
  {

    if (this.numOfTrainings == null || this.numOfTrainings == undefined || this.numOfTrainings == "")
    {
      this.errorMessage = "You must enter all data"
      return;
    }

    if (this.trainer == null || this.trainer == undefined || this.trainer == "")
    {
      this.errorMessage = "You must enter all data"
      return;
    }

    if (this.info == null || this.info == undefined || this.info == "")
    {
      this.errorMessage = "You must enter all data"
      return;
    }

    this.service.individualTrainingRequest(this.user, this.numOfTrainings, this.trainer, this.info).subscribe((ob)=>
    {
      if(ob['request'] == 'ok')
      {
        this.errorMessage = "";
        this.finished = true;
        this.okMessage = "You have successfully requested a personal training. You can check all your trainings in your profile tab." 
      }
    })


  }




}
