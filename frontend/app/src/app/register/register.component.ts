import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.regSuccessFlag = false;
    this.messageSuccess = "";
    this.message = "";
    if(localStorage.getItem("LoggedUser") === "logged") this.router.navigate(["/homepage"]);
  }

  name : string;
  surname : string;
  mail : string;
  username : string;
  password : string;
  confpassword : string;
  city : string;
  type : string;
  stat : string;
  phonenumber : string;
  message : string;
  messageSuccess;

  regSuccessFlag;

  register()
  {
    if (this.name == null || this.name == undefined || this.name == "")
    {
      this.message = "You must enter all data"
      return;
    }
    
    if (this.surname == null || this.surname == undefined || this.surname == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.username == null || this.username == undefined || this.username == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.password == null || this.password == undefined || this.password == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.confpassword == null || this.confpassword == undefined || this.confpassword == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.city == null || this.city == undefined || this.city == "")
    {
      this.message = "You must enter all data"
      return;
    }

    if (this.phonenumber == null || this.phonenumber == undefined)
    {
      this.message = "You must enter all data"
      return;
    }

    if (this.mail == null || this.mail == undefined || this.mail == "")
    {
      this.message = "You must enter all data"
      return;
    }

    this.type = "user";
    this.stat = "0";

    this.services.register(this.name, this.surname, this.mail, this.username, this.password, this.confpassword, this.city, this.phonenumber, this.type, this.stat).subscribe((ob)=>
    {
      if(ob['user'] == 'ok')
      {
        localStorage.setItem('regOk', 'regisok');

        this.services.resetUserDate(this.username).subscribe((ob)=>{
          if(ob['user'] == 'ok')
          {
            this.message = "";
            this.regSuccessFlag = true;
          }
        })

       
      }
      else
      {
        this.messageSuccess = "";
        if(ob['user'] == 'er1') this.message = "Password must match!";
        if(ob['user'] == 'er2') this.message = "Username already exists!";
        if(ob['user'] == 'er3') this.message = "Mail already exists!";
        if(ob['user'] == 'er4') this.message = "Password must have at least 1 upper, 1 lower case, 1 numeric character and must be between 8 and 12 characters long!";
      }
    })
  }

}
