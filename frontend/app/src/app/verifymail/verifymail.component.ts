import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-verifymail',
  templateUrl: './verifymail.component.html',
  styleUrls: ['./verifymail.component.css']
})
export class VerifymailComponent implements OnInit {

  orderby: string;

  constructor(private router : Router, private route: ActivatedRoute, private services : ServicesService) { }

  ngOnInit() {
    this.verifiedFlag = false;
    this.checkVerification();
   
  }

  verifiedFlag;

  checkVerification()
  {
      this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        if(params == undefined || params == null)
        {
          this.router.navigate(['/homepage']);
        }
        this.orderby = params.id;
        if(this.orderby == "" || this.orderby == undefined || this.orderby == null)
        {
          this.router.navigate(['/homepage']);
        }
        else
        {
          this.services.verifyMail(this.orderby).subscribe((ob)=>
        {
          if(ob != null)
          {
            if(ob["verify"] == "ok") this.verifiedFlag = true;
            else if(ob["verify"] == "no") 
            {
              this.verifiedFlag = false;
              this.router.navigate(['/homepage']);
            }
          }
          else
          {
            this.verifiedFlag = false;
            this.router.navigate(['/homepage']);
          }
          
        })
        }
      }
    );
  }


  goToLogIn()
  {
    this.router.navigate(['/login']);
  }
}
