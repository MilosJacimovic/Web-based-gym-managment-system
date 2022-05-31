import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from '../Model/training.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-personaltraining',
  templateUrl: './personaltraining.component.html',
  styleUrls: ['./personaltraining.component.css']
})
export class PersonaltrainingComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.personal = new Training();
    this.getPersonalTraining();
    this.type = "";
    this.srcForImage = "http://localhost:4000/static/";

    this.isLogged = "notLogged"
    this.isLogged = localStorage.getItem("LoggedUser");
    if(this.isLogged === "logged") 
    {
      this.type = localStorage.getItem("typeOfUser");
      this.myUsername = localStorage.getItem("myUsername");
    }
  }


  personal : Training;
  srcForImage : String;
  myUsername;
  isLogged;
  type;

  getPersonalTraining()
  {
    this.services.getPersonalTraining().subscribe((ob : Training)=>
    {
      if(ob != null)
      {
        this.personal = ob;
      }
    })
  }

}
