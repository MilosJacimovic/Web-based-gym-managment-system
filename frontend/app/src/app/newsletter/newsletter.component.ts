import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }


  ngOnInit(): void {
    this.getNewsLetterSubs();
    this.getNumOfSubs();
  }

  numOfSubs;
  allSubs;


  email;
  reason;
  message;
  errorMessage;
  okMessage;

  sendNewsLetter()
  {
    if (this.email == null || this.email == undefined || this.email == "")
    {
      this.errorMessage = "You must enter all data"
      this.okMessage = "";
      return;
    }
    if (this.reason == null || this.reason == undefined || this.reason == "")
    {
      this.errorMessage = "You must enter all data"
      this.okMessage = "";
      return;
    }
    if (this.message == null || this.message == undefined || this.message == "")
    {
      this.errorMessage = "You must enter all data"
      this.okMessage = "";
      return;
    }

   this.services.NewsLetterMail(this.allSubs, this.email, this.reason, this.message).subscribe((ob)=>
   {
    if(ob['mail'] == "ok") 
    {
      this.errorMessage = "";
      this.okMessage = "You have successfully sent newsletter."
    }
   })
  }


  getNewsLetterSubs()
  {
    this.services.getNewsLetterSubs().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.allSubs = ob;
      }
    })
  }

  getNumOfSubs()
  {
    this.services.getNumOfSubs().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.numOfSubs = ob;
      }
    })
  }


}
