import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-editcosts',
  templateUrl: './editcosts.component.html',
  styleUrls: ['./editcosts.component.css']
})
export class EditcostsComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.wantToUpdateFlag = false;
    this.myUsername = localStorage.getItem("myUsername");
    let isAdmon = localStorage.getItem("typeOfUser");
    if(isAdmon !== "admin" && isAdmon !== "trainer") this.router.navigate(['/homepage']);
    else{ this.getAllMemberships(); }
  }


  memberships;
  myUsername;
  wantToUpdateFlag;
  nameForUpdate;

  newDescription;
  newDuration;
  newStandardPrice;
  newStudentPrice;
  toUpdate;

  getAllMemberships()
  {
    this.services.getAllMemberships().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.memberships = ob;
      }
    })
  }


  updateOne(membership)
  {
    if(this.newDescription == "" || this.newDescription == undefined) this.newDescription = membership.description;
    if(this.newDuration == "" || this.newDuration == undefined) this.newDuration = membership.duration;
    if(this.newStandardPrice == "" || this.newStandardPrice == undefined) this.newStandardPrice = membership.price;
    if(this.newStudentPrice == "" || this.newStudentPrice == undefined) this.newStudentPrice = membership.discount;

    this.services.updateMembership(membership.name, this.newDescription, this.newDuration, this.newStandardPrice, this.newStudentPrice).subscribe((ob)=>
    {
      if(ob['membership'] == "ok")
      {
        alert('User updated succesfully!');
        this.newDescription = "";
        this.newDuration = "";
        this.newStandardPrice = "";
        this.newStudentPrice = "";
        this.nameForUpdate = "";
        this.toUpdate = false;
        this.wantToUpdateFlag = false;
        this.getAllMemberships();
      }
    })
  
  }

  wantToUpdate(name)
  {
    this.nameForUpdate = name;
    this.wantToUpdateFlag = true;
  }
}
