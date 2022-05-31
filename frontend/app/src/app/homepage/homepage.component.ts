import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gym } from '../Model/gym.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.Gym = new Gym();

    this.getGym();
  }


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
}
