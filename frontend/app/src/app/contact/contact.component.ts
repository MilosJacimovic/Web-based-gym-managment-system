import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gym } from '../Model/gym.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.okMessage = "";
    this.errorMessage = "";


    this.Gym = new Gym();
    this.getGym();
    this.today = new Date();
    this.pipe = new DatePipe('en-US');
    this.todayWithPipe = null;
  }

  today : Date;
  pipe;
  todayWithPipe;


  firstname;
  lastname;
  email;
  reason;
  message;
  
  okMessage;
  errorMessage;

  Gym : Gym;

  getGym()
  {
    this.services.getGym().subscribe((ob : Gym)=>
    {
      if(ob)
      {
        this.Gym = ob;
      }
    })
  }

  

  SendUsMail()
  {

    if (this.firstname == null || this.firstname == undefined || this.firstname == "")
    {
      this.errorMessage = "You must enter all data"
      return;
    }
    if (this.lastname == null || this.lastname == undefined || this.lastname == "")
    {
      this.errorMessage = "You must enter all data"
      return;
    }
    if (this.email == null || this.email == undefined || this.email == "")
    {
      this.errorMessage = "You must enter all data"
      return;
    }
    if (this.reason == null || this.reason == undefined || this.reason == "")
    {
      this.errorMessage = "You must enter all data"
      return;
    }
    if (this.message == null || this.message == undefined || this.message == "")
    {
      this.errorMessage = "You must enter all data"
      return;
    }
   this.services.SendUsMail(this.firstname, this.lastname, this.email, this.reason, this.message).subscribe((ob)=>
   {
    if(ob['mail'] == "ok") 
    {
      this.errorMessage = "";
      this.okMessage = "You have successfully contacted us."
    }
   })
  }
  




}


