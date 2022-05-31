import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-ourteam',
  templateUrl: './ourteam.component.html',
  styleUrls: ['./ourteam.component.css']
})
export class OurteamComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.srcForImage = "http://localhost:4000/static/";
    this.getAllTrainers()
  }


  personnels;
  srcForImage;


  getAllTrainers()
  {
    this.services.getAllTrainers().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.personnels = ob;
      }
    })
  }

  getAllPersonnel()
  {
    this.services.getAllPersonnel().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.personnels = ob;
      }
    })
  }
}
