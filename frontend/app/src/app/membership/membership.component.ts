import { ArrayType } from '@angular/compiler';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Membership } from '../Model/membership.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {

   this.memberships = new Array(Membership);
    this.getAllMemberships();
  }

  memberships;


  getAllMemberships()
  {
    this.services.getAllMemberships().subscribe((ob )=>
    {
      if(ob != null)
      {
        this.memberships = ob;
      }
    })
  }

}
