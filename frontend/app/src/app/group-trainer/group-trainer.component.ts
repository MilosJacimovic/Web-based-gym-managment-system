import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from '../Model/training.model';
import { ServicesService } from '../services.service';
import { groupTraining } from '../Model/groupTraining.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-group-trainer',
  templateUrl: './group-trainer.component.html',
  styleUrls: ['./group-trainer.component.css']
})
export class GroupTrainerComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.days  = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    this.waitFlag = false;
    this.pipe = new DatePipe('en-US');
    this.messageFail = "";
    this.messageOk = "";
    let isLogged = localStorage.getItem("LoggedUser");
    if(isLogged !== "logged") this.router.navigate(['/homepage']);
    else
    {
      let type = localStorage.getItem("typeOfUser");
      if(type === 'user')  this.router.navigate(['/homepage']);
      this.myUsername = localStorage.getItem("myUsername");
      this.getMySelf();
      this.getMyWeeklyTrainings();
      this.checkAvailabelDays();

    }
  }

  

  myUsername;
  user;
  myTrainings : Array<Training>;

  pipe;

  newTraining;
  newTime;
  newMaxPeople;
  newDuration;
  newDayOfTheWeek;

  messageFail;
  messageOk;

  messageWait;
  waitFlag;

  trainingsOfTheWeek : Array<groupTraining>;

  days;

  avaliableDays ;

   sortDays = function (a, b) {
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    a = days.indexOf(a);
    b = days.indexOf(b);
    return a < b ? 0 : 1;
  };

  checkAvailabelDays()
  {
    let day = this.pipe.transform(Date.now(), 'EEEE');
    switch (day) {
      case "Monday":
        this.avaliableDays = ["Tuesday", "Wednesday", "Thursday", "Friday"];
        break;
    
      case "Tuesady":
        this.avaliableDays = ["Wednesday", "Thursday", "Friday"];
        break;
    
      case "Wednesday":
        this.avaliableDays = ["Thursday", "Friday"];
        break;
    
      case "Thursday":
        this.avaliableDays = ["Thursday", "Friday"];
        break;
      case "Friday":
        this.messageWait = "You have to wait till tomorrow to add new trainings for the next week."
        this.waitFlag = true;
        break;
      default:
        this.avaliableDays = ["Tuesday", "Wednesday", "Thursday", "Friday"];
        
        break;
    }
  }

  getMyWeeklyTrainings()
  {
    this.services.getMyWeeklyTrainings(this.myUsername).subscribe((ob : Array<groupTraining>)=>
    {
      if(ob)
      {
       

        this.trainingsOfTheWeek = ob;
        this.trainingsOfTheWeek.sort(this.sortDays);
        //array.sort((a,b) => a.title.rendered.localeCompare(b.title.rendered));
      }
    })
  }


  getMySelf()
  {
    this.services.getOneUser(this.myUsername).subscribe((ob)=>
    {
      if(ob)
      {
        this.user = ob;
        this.myTrainings = this.user.listoftrainings;
      }
    })
  }

  newGroupTraining()
  {
    if (this.newTraining == null || this.newTraining == undefined || this.newTraining == "")
    {
      this.messageFail = "You must enter all data"
      this.messageOk = "";
      return;
    }

    if (this.newTime == null || this.newTime == undefined || this.newTime == "")
    {
      this.messageFail = "You must enter all data"
      this.messageOk = "";
      return;
    }

    if (this.newMaxPeople == null || this.newMaxPeople == undefined || this.newMaxPeople == "")
    {
      this.messageFail = "You must enter all data"
      this.messageOk = "";
      return;
    }

    if (this.newDuration == null || this.newDuration == undefined || this.newDuration == "")
    {
      this.messageFail = "You must enter all data"
      this.messageOk = "";
      return;
    }

    if (this.newDayOfTheWeek == null || this.newDayOfTheWeek == undefined || this.newDayOfTheWeek == "")
    {
      this.messageFail = "You must enter all data"
      this.messageOk = "";
      return;
    }

    this.services.trainerNewGroupTraining(this.myUsername, this.newTraining, this.newTime, this.newMaxPeople, this.newDuration, this.newDayOfTheWeek).subscribe((ob)=>
    {
      if(ob['training'] == 'ok')
      {
        this.messageFail = "";
        alert("You have successfully added a new training for the week");
        this.ngOnInit();
      }
    })
  }



}
