import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    if(!this.hasSubscribed)
    {
      this.canSubscribe = true;
      this.placeholder = "Enter your mail please"
    }
   
    this.myMail = "";
  }

  myMail;
  hasSubscribed;
  placeholder;
  canSubscribe : boolean;

  newsletterSubsribe()
  {
    if (this.myMail == null || this.myMail == undefined || this.myMail == "")
    {

    }
    else
    {
      this.services.newsLetterRequest(this.myMail).subscribe((ob)=>
      {
        this.hasSubscribed = true;
        this.canSubscribe = false;
        this.placeholder = "You have succesfully subscribed to our newsletter. "
        this.ngOnInit();
      })
    }

  }
}
