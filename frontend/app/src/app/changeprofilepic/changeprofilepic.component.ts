import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import Webcam from 'webcam-easy';

@Component({
  selector: 'app-changeprofilepic',
  templateUrl: './changeprofilepic.component.html',
  styleUrls: ['./changeprofilepic.component.css']
})
export class ChangeprofilepicComponent implements OnInit {

  constructor(private router : Router, private service : ServicesService) { }

  ngOnInit(): void {
    this.takePhotoFlag = false;
    this.username = localStorage.getItem("unameavatar");
    this.imageDataUrl = '../../assets/generic-profile.png';
    this.srcForImage = "http://localhost:4000/static/";
    this.initPic();
    //localStorage.removeItem("unameavatar");
  }


  username;
  imageDataUrl;
  user;
  profilePic;
  e;
  file_uploaded_message;
  error_file_uploaded_message;
  srcForImage;
  whichPic;

  takePhotoFlag;

  takePhoto()
  {
    this.takePhotoFlag = true;
    this.router.navigate(["/qrscanerproba"]);
  }

  file_change(e: any)
  {
    this.e = e;
  }


  uploadPhoto(idd)
  {
    if(this.e != null)
    {
      this.file_change(this.e);
      this.service.send_photos(this.e, idd).subscribe((ob) =>
      {
        if(ob['status'] == "uploaded") alert('Photo added');
        this.initPic();
      })
      this.file_uploaded_message = "Successfuly uploaded file";
    }
    else this.error_file_uploaded_message = "Please add files to upload!";

  }

  initPic()
  {
    this.service.getOneUser(this.username).subscribe((ob)=>
    {
      if(ob != null) 
      {
        this.user = ob;
        if(this.user.image == "")
        {
          this.whichPic = true;
          this.profilePic = "../../assets/generic-profile.png";
        }
        else
        {
          this.whichPic = false;
          this.profilePic = this.user.image;
        }
      }
    });
  }

  addPhoto()
  {
    this.uploadPhoto(this.username);
  }

}
