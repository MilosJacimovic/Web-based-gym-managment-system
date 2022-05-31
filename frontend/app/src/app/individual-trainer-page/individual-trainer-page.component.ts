import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalRequest } from '../Model/personalRequest.model';
import { PersonalTrainings } from '../Model/personalTraining.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-individual-trainer-page',
  templateUrl: './individual-trainer-page.component.html',
  styleUrls: ['./individual-trainer-page.component.css']
})
export class IndividualTrainerPageComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {

    this.noRequestsFlag = false;
    this.myRequest = new PersonalRequest();
    
    this.inProgressTrainings = new Array(PersonalTrainings);
    this.deniedTrainings = new Array(PersonalTrainings);
    this.completedTrainings = new Array(PersonalTrainings);
   
    let isLogged = localStorage.getItem("LoggedUser");
    if(isLogged !== "logged") this.router.navigate(['/homepage']);
    else
    {
    
      this.myUsername = localStorage.getItem("myUsername");
      this.getMySelf();
      this.getMyRequestsTrainer();
      this.getTrainersCompletedTrainings();
      this.getTrainersDeninedTrainings();
      this.getTrainersInProgressTrainings();
    }
  }

  myUsername;
  user;
  myRequest;

  noRequestsFlag;

  inProgressTrainings;
  deniedTrainings;
  completedTrainings;

  getMySelf()
  {
    this.services.getOneUser(this.myUsername).subscribe((ob)=>
    {
      if(ob)
      {
        this.user = ob;
      }
    })
  }

  getMyRequestsTrainer()
  {
    this.services.getMyRequestsTrainer(this.myUsername).subscribe((ob)=>
    {
      if(ob)
      {
        this.myRequest = ob;
      }
      else
      {
        this.noRequestsFlag = true;
      }
    })
  }

  getTrainersInProgressTrainings()
  {
   this.services.getTrainersInProgressTrainings(this.myUsername).subscribe((ob)=>
   {
     if(ob)
     {
       this.inProgressTrainings = ob;
     }
   })
  }

  getTrainersDeninedTrainings()
  {
    this.services.getTrainersDeninedTrainings(this.myUsername).subscribe((ob)=>
   {
     if(ob)
     {
       this.deniedTrainings = ob;
     }
   })
  }

  getTrainersCompletedTrainings()
  {
    this.services.getTrainersCompletedTrainings(this.myUsername).subscribe((ob)=>
   {
     if(ob)
     {
       this.completedTrainings = ob;
     }
   })
  }

  accept(attendee, trainer)
  {
    this.services.acceptPersonalTrainingRequest(attendee, trainer).subscribe((ob)=>
    {
      if(ob['training'] == 'ok')
      {
        alert("Successfully accepted training request.")
        this.ngOnInit();
      }
    })
  }

  reject(attendee, trainer)
  {
    this.services.rejectPersonalTrainingRequest(attendee, trainer).subscribe((ob)=>
    {
      if(ob['training'] == 'ok')
      {
        alert("Successfully rejected training request.")
        this.ngOnInit();
      }
    })
  }

  doneOneTraining(id)
  {
    this.services.doneOneTraining(id).subscribe((ob)=>
    {
      if(ob['training'] == 'ok') 
      {
        this.ngOnInit();
      }
    })
  }

  renew(id)
  {
    this.services.renewPersonalTraining(id).subscribe((ob)=>
    {
      if(ob['training'] == 'ok') 
      {
        this.ngOnInit();
      }
    })
  }

}
