import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalRequest } from '../Model/personalRequest.model';
import { PersonalTrainings } from '../Model/personalTraining.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-individual-training-user',
  templateUrl: './individual-training-user.component.html',
  styleUrls: ['./individual-training-user.component.css']
})
export class IndividualTrainingUserComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {

    this.hasRequests = false;
    this.myRequest = new PersonalRequest();
    
    this.inProgressTrainings = new PersonalTrainings();
    this.deniedTrainings = new Array(PersonalTrainings);
    this.completedTrainings = new Array(PersonalTrainings);

    let isLogged = localStorage.getItem("LoggedUser");
    if(isLogged !== "logged") this.router.navigate(['/homepage']);
    else
    {
      this.myUsername = localStorage.getItem("myUsername");
      this.getMySelf();
      this.getMyRequestUser();
      this.getUsersCompletedTrainings();
      this.getUsersDeninedTrainings();
      this.getUsersInProgressTrainings();
    }
  }


  myUsername;
  user;
  myRequest;

  hasRequests;

  inProgressTrainings;
  deniedTrainings;
  completedTrainings;

  getUsersInProgressTrainings()
  {
    this.services.getUsersInProgressTrainings(this.myUsername).subscribe((ob)=>
    {
      console.log(this.inProgressTrainings);
      if(ob)
      {
        this.inProgressTrainings = ob;
      }

      console.log(this.inProgressTrainings);
    })
  }

  getUsersDeninedTrainings()
  {
    this.services.getUsersDeninedTrainings(this.myUsername).subscribe((ob)=>
    {
      if(ob)
      {
        this.deniedTrainings = ob;
      }
    })
  }

  getUsersCompletedTrainings()
  {
    this.services.getUsersCompletedTrainings(this.myUsername).subscribe((ob)=>
    {
      if(ob)
      {
        this.completedTrainings = ob;
      }
    })
  }


  getMyRequestUser()
  {
    this.services.getMyRequestUser(this.myUsername).subscribe((ob)=>
    {
      if(ob)
      {
        this.myRequest = ob;

      }
      else
      {
        this.hasRequests = true;
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
      }
    })
  }
}
