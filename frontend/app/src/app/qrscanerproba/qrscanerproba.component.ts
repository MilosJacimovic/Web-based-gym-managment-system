import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
// To use Html5QrcodeScanner (more info below)
import {Html5QrcodeScanner} from "html5-qrcode"

// To use Html5Qrcode (more info below)
import {Html5Qrcode} from "html5-qrcode"
import Webcam from 'webcam-easy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrscanerproba',
  templateUrl: './qrscanerproba.component.html',
  styleUrls: ['./qrscanerproba.component.css']
})
export class QrscanerprobaComponent implements OnInit {

  constructor(private services : ServicesService, private router : Router) { }

  ngOnInit(): void {
    this.init();
    }

    webcamElement;
    canvasElement;
    webcam;

    picture;

    init()
    {
      this.webcamElement = document.getElementById('webcam');
      this.canvasElement = document.getElementById('canvas');
      this.webcam = new Webcam(this.webcamElement, 'user', this.canvasElement);


      this.start();
    }


    goBack()
    {
      this.router.navigate(["/changeprofilepic"]);
    }
    start()
    {
      this.webcam.start()
      .then(result =>{
         console.log("webcam started");
      })
      .catch(err => {
          console.log(err);
      });
    }

    takePicture()
    {
      this.picture = this.webcam.snap();
      console.log(this.picture)
    }

    stop()
    {
      this.webcam.stop();
    }
  

}