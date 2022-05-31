import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.type = localStorage.getItem("typeOfUser");
    this.user = new User();
    this.is_logged = localStorage.getItem("LoggedUser");
    this.showIndividual = false;
    if(this.is_logged == 'logged' && this.type == 'trainer')
    {
      this.getTrainer();
    }
    else if(this.is_logged == 'logged' && (this.type == 'user' || this.type == 'admin'))
    {
      this.getOneUser();
    }

  }

  is_logged;
  type;
  user : User;
  allGyms;

  showIndividual : boolean;

  getOneUser()
  {
    let uname = localStorage.getItem("myUsername");
    this.services.getOneUser(uname).subscribe((ob : User)=>
    {
      if(ob != null)
      {
        this.user = ob;
      }
    })
  }


  getTrainer()
  {
    let uname = localStorage.getItem("myUsername");
    this.services.getOneUser(uname).subscribe((ob : User)=>
    {
      if(ob != null)
      {
        this.user = ob;
        if(this.user.listoftrainings.includes('Personal'))
        {
          this.showIndividual = true;
        }
      }
    })


  }

  gohome()
  {
    this.router.navigate(["/homepage"]);
  }
  login()
  {
   this.router.navigate(["/login"]);
   this.ngOnInit();
  }

  profile()
  {
    this.router.navigate(['/profile']);
  }

  goContact()
  {
    this.router.navigate(['/contact']);
  }

  logout()
  {
    localStorage.clear();
    this.type = "guest";
    this.is_logged = "false";
    this.router.navigate(["/homepage"]);
    this.ngOnInit();
  }

  goMembership()
  {
    this.router.navigate(['/membership']);
  }

  goOurTeam()
  {
    this.router.navigate(['/ourteam']);
  }

}


