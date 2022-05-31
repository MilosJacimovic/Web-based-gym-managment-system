import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-profilechecker',
  templateUrl: './profilechecker.component.html',
  styleUrls: ['./profilechecker.component.css']
})
export class ProfilecheckerComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.uname = "";
    this.srcForImage = "http://localhost:4000/static/";
    this.uname = localStorage.getItem("unameForMembershipCheck");
    if(this.uname != null && this.uname != "")
    {
      this.getOneUser();
    }
    else
    {
      this.router.navigate[('/checkmemberships')]
    }
  }

  uname;
  userForCheck : User;
  profilePic
  srcForImage;

  getOneUser()
  {
    this.services.getOneUser(this.uname).subscribe((ob : User)=>
    {
      if(ob)
      {
        this.userForCheck = ob;

        if(this.userForCheck.image == "")
        {
          this.profilePic = "../../assets/generic-profile.png";
        }
        else
        {
          
          this.profilePic = this.userForCheck.image;
          this.profilePic = this.srcForImage + this.userForCheck.username + "/" + this.userForCheck.image;
        }
      }

      
    })
  }

  goBack()
  {
    localStorage.removeItem("unameForMembershipCheck");
    this.router.navigate(["/checkmemberships"]);
  }

}
