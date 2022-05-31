import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import {Html5QrcodeScanner} from "html5-qrcode"

@Component({
  selector: 'app-checkmembership',
  templateUrl: './checkmembership.component.html',
  styleUrls: ['./checkmembership.component.css']
})
export class CheckmembershipComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {

    this.urlForCheck = "";
    this.scanTogle = false;

    // @ts-ignore
    this.html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: {width: 400, height: 400} }, /* verbose= */ false);
    this.html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);

    this.wantToSearch = false;
    this.searchedMember = "";
    this.errorSearch = false;
    this.getApprovedUsers();
    this.message = "User doesnt exist or your search criteria is bad."
    this.srcForImage = "http://localhost:4000/static/";
    this.imageDataUrl = '../../assets/generic-profile.png';
  }


  scanTogle;
  html5QrcodeScanner;
  allMembers;
  srcForImage;
  searchedMember : string;
  wantToSearch;
  SearchedMembers;
  message;
  errorSearch ;
  imageDataUrl;

  urlForCheck;
  url;

  wantToScan()
  {
    this.scanTogle = true;
  }
  

  onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    alert(decodedText);
    
    this.router.navigate(['/decodedText']);
    this.url = decodedText;

    this.html5QrcodeScanner.stop().then((ignore) => {
      // QR Code scanning is stopped.
      console.log(":adsdsad")
    }).catch((err) => {
      // Stop failed, handle it.
    });
    
  }

  checkMember()
  {
    localStorage.removeItem("unameForMembershipCheck");
    if(this.urlForCheck != "" && !this.urlForCheck != undefined)
    {
      localStorage.setItem("unameForMembershipCheck", this.urlForCheck);
      this.router.navigate(["/profilechecker"]);
    }
  }

  onScanFailure(error) {
  }

  search()
  {

    if(this.searchedMember == undefined || this.searchedMember == "")
    {
      this.message = "You must enter both name and surname!";
      this.errorSearch = true;
      this.wantToSearch = false;
      return;
    }
    var splited = this.searchedMember.split(" ", 2);

    if(splited[0] == undefined || splited[1] == undefined)
    {
      this.message = "You must enter both name and surname!";
      this.errorSearch = true;
      this.wantToSearch = false;
      return;
    }



    this.services.searchUsers(splited[0], splited[1]).subscribe((ob)=>
    {
      if(ob != null)
      {
        this.SearchedMembers = ob;
        this.errorSearch = false;
        this.searchedMember = "";
      }
    })
    this.wantToSearch = true;
    
  }
  getApprovedUsers()
  {
    this.services.getApprovedUsers().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.allMembers = ob;
      }
    })
  }

  renewMembership(uname)
  {
    this.services.renewMembership(uname).subscribe((ob)=>
    {
      if(ob != null) 
      {
        alert("Successfully updated membership for: " + uname);
        this.ngOnInit();
      }
    })
  }
}
