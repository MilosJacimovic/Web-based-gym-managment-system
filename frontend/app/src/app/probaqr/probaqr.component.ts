import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-probaqr',
  templateUrl: './probaqr.component.html',
  styleUrls: ['./probaqr.component.css']
})
export class ProbaqrComponent implements OnInit {

  constructor(private services : ServicesService) { }

  ngOnInit(): void {
    this.srcForImage = "";


  }


  srcForImage : String;
  url : String;

  srcc;


  probaa()
  {
    this.services.probaQrCode(this.url).subscribe((ob : String)=>
    {
      console.log(ob)
      this.srcForImage = ob;
    })
  }
}
