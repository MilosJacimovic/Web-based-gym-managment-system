import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from '../Model/training.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-gtrainings',
  templateUrl: './gtrainings.component.html',
  styleUrls: ['./gtrainings.component.css']
})
export class GtrainingsComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.srcForImage = "http://localhost:4000/static/";
    this.getAllGroupTrainings();

  }


  allTrainings;
  trainings : Array<Training>;

  srcForImage;

  getAllGroupTrainings()
  {
    this.services.getAllGroupTrainings().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.allTrainings = ob;
      }
    })
  }

}
