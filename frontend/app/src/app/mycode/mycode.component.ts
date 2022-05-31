import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-mycode',
  templateUrl: './mycode.component.html',
  styleUrls: ['./mycode.component.css']
})
export class MycodeComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.myUname = "";
    this.myUname = localStorage.getItem("myUsername");
    if(this.myUname != undefined && this.myUname != "")
      this.getMySelf();
  }


  myUname;
  myself : User;
  srcForImage

  getMySelf()
  {
    this.services.getOneUser(this.myUname).subscribe((ob : User)=>
    {
      if(ob != null)
      {
        
        this.myself = ob;
        this.srcForImage = this.myself.qrcode;
      }
    })
  }

}
