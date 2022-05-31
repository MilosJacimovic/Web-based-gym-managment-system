import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gymfacilities',
  templateUrl: './gymfacilities.component.html',
  styleUrls: ['./gymfacilities.component.css']
})
export class GymfacilitiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.p1 = "Battle ropes, medicine balls, kettlebells, power plates, kinesis stations… this area is one that exercisers can get themselves in a sweat about. But it’s nothing new. Functional fitness is the body’s natural way of moving - pushing, pulling, lifting, squatting and climbing. The sole purpose is the make your body stronger, flexier, more stable and agile. Ask a personal trainer to show you how to use functional equipment - you’ll love it once you know how to use it."
    this.p2 = "The basic workout tools in this area include dumbbells, barbells, benches, power racks and press stations. When you join a Holmes Place club, we’ll include the amount of sets and reps you need to perform in your personalised plan (if this area is necessary to achieve your goals). Using a ‘spotter’ (someone to support you lift weights safely) can help prevent injuries in this area and motivate you to lift to your maximum potential."
    this.p3 = "If you’re wondering what areas are available in a gym that don’t rely on cardio or strength, the stretching area is the answer. It’s a lovely space for those who want to work on their core and flexibility, with mats for stretching and yoga. You’ll find most gym members head to this area at the start and end of their workout - use it to warmup and cool down to prevent injuries."
    this.p4 = "Familiarise yourself with what areas are available in a gym and you’ll lose any weird feelings of “not knowing where to go or what to do”. When you join a Holmes Place club you’ll get a personalised plan by one of our expert personal trainers, who’ll be happy to go through everything with you and make sure you have fun reaching your goals."
  }


  p1;
  p2;
  p3;
  p4;

}
