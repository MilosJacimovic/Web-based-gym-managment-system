import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { groupTraining } from '../Model/groupTraining.model';
import { ServicesService } from '../services.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-group-user',
  templateUrl: './group-user.component.html',
  styleUrls: ['./group-user.component.css']
})
export class GroupUserComponent implements OnInit {

  constructor(private services : ServicesService, private router : Router) { }

  ngOnInit(): void {
    this.probica = "border-success"
    this.dddd = true;
    this.messageCancel = "";
    this.messageTrain = "";
    this.myUsername = localStorage.getItem("myUsername");
    this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    this.getCurrentHour();
    this.getCurrentDay();
    this.tooltipText = "dadasdasd"
    this.distinctTimes = new Array;
    this.getAllGroupTrainings();
  }


  probica : String;
  allGroupTrainings : Array<groupTraining>;
  distinctTimes;
  days;
  currentHour;
  currentDay;
  myUsername;
  dddd;
  messageCancel;
  messageTrain;

  tooltipText : String;

  sortDays = function (a, b) {
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    a = days.indexOf(a);
    b = days.indexOf(b);
    return a < b ? 0 : 1;
  };

  attended(training : groupTraining)
  {
    this.getCurrentDay();
    this.getCurrentHour();
    let myUsername = localStorage.getItem("myUsername");
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    if(training.participants.includes(myUsername))
    {
      if(training.day == this.currentDay)
      {
        if(training.time - this.currentHour <= 1)
        {
          return true;
        }
      }
      else
      {
        if(days.indexOf(this.currentDay) > days.indexOf(training.day))
        {
          return true;
        }
      }
    }

    return false;
  }

  missed(training : groupTraining)
  {
    this.getCurrentDay();
    this.getCurrentHour();
    let myUsername = localStorage.getItem("myUsername");
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    if(!training.participants.includes(this.myUsername))
    {
      if(training.day == this.currentDay)
      {
        if(training.time - this.currentHour <= 1)
        {
          return true;
        }
      }
      else
      {
        if(days.indexOf(this.currentDay) > days.indexOf(training.day))
        {
          return true;
        }
      }
    }

    return false;
  }

  findDistinctTimes(allGroupTrainings)
  {
    allGroupTrainings.forEach(training => {
      if(!this.distinctTimes.find(element => element == training.time))
      {
        this.distinctTimes.push(training.time);
      }
    });
    this.distinctTimes.sort();
  }

  getCurrentHour()
  {
    var time = new Date();
    this.currentHour = time.toLocaleString('en-US', { hour: 'numeric', hour12: false });
  }

  CanTrain(training)
  {
    this.getCurrentDay();
    this.getCurrentHour();
    let myUsername = localStorage.getItem("myUsername");
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    if(!training.participants.includes(myUsername))
    {
      if(this.currentDay == 'Saturday' || this.currentDay == 'Sunday')
      {
        return true;
      }
      else
      {
        if(this.currentDay == training.day)
        {
          if(training.time - this.currentHour > 1) return true;
        }
        else
        {
          if(days.indexOf(this.currentDay) < days.indexOf(training.day))
          {
            return true;
          }
        }
      }
    }
    else
    {
      return false;
    }
    
    this.messageCancel = "dwdsd";
    return false;
  }

  CanCancel(training)
  {
    this.getCurrentDay();
    this.getCurrentHour();
    let myUsername = localStorage.getItem("myUsername");
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    if(training.participants.includes(myUsername))
    {
      if(this.currentDay == 'Saturday' || this.currentDay == 'Sunday')
      {
        return true;
      }
      else
      {
        if(this.currentDay == training.day)
        {
          if(training.time - this.currentHour > 1) return true;
        }
        else
        {
          if(days.indexOf(this.currentDay) < days.indexOf(training.day))
          {
            return true;
          }
        }
      }
    }
   


    return false;
  }

  check(name, trday, day, trhour, time)
  {
    console.log(name + " " + trday + " " + day + " " + trhour + " " + time)
    return true;
  }
  getCurrentDay()
  {
    var time = new Date();
    var num = time.getDay();
    this.currentDay = this.days[num-1];
    //alert(this.currentDay)
    //this.currentDay = "Monday"
  }
  attendTraining(training : groupTraining)
  {
    this.services.attendGroupTraining(training, localStorage.getItem("myUsername")).subscribe((ob)=>
    {
      if(ob['ok'] == 'ok') this.ngOnInit();
    })
  }

  cancelTraining(training)
  {
    this.services.cancelGroupTraining(training, localStorage.getItem("myUsername")).subscribe((ob)=>
    {
      if(ob['ok'] == 'ok') this.ngOnInit();
    })
  }

  getAllGroupTrainings()
  {
    this.services.getAllWeeklyGroupTrainings().subscribe((ob : Array<groupTraining>)=>
    {
      if(ob)
      {
        this.allGroupTrainings = ob;
        //this.allGroupTrainings.sort(this.sortDays);
        console.log(this.allGroupTrainings);
        this.findDistinctTimes(this.allGroupTrainings);
      }
    })
  }

}
