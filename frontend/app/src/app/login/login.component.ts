import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
 
    if(localStorage.getItem("LoggedUser") === "logged") this.router.navigate(["/homepage"]);
    this.verifiedFlag = false;
  }

  message : string;
  regOk : string;
  username : string;
  password : string;

  verifiedFlag;


  login()
  {
    this.message = "";
 
    if((this.username == "" || this.username == undefined) || (this.password == "" || this.password == undefined))
    {
      this.regOk = null;
      this.message = "You must enter all data!";
      return;
    }

    this.services.login(this.username, this.password).subscribe((user : User)=>
    {
      if(user)
      {
        if(user.verified == 1)
        {
          this.verifiedFlag = false;
          localStorage.setItem("typeOfUser", user.type);
          localStorage.setItem("myUsername", user.username);
          localStorage.setItem("LoggedUser", "logged");
          this.regOk = null;
          localStorage.removeItem('regOk');
          this.router.navigateByUrl("/homepage");
          window.location.reload();
        }
        else
        {
          this.verifiedFlag = true;
        }
     
      }
      else
      {
        this.regOk = null;
        this.message = "You entered wrong credentials";
      }
    })
  }


  register()
  {
    this.router.navigate(["/register"]);
  }
}
