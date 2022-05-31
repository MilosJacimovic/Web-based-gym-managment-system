import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router : Router, private service : ServicesService) { }

  ngOnInit(): void {

    this.user = new User();
    this.firstLogin = false;
    this.firstLoginMessage = "";
    this.changePasswordFlag = false;
    this.imageDataUrl = '../../assets/generic-profile.png';
    this.infoChangeFlag = false;
    this.message = "";
    this.myUsername = null;
    this.srcForImage = "http://localhost:4000/static/";
    let isLogged = localStorage.getItem("LoggedUser");
    if(isLogged !== "logged") this.router.navigate(['/homepage']);
    else
    {
      this.myUsername = localStorage.getItem("myUsername");
      this.getMySelf();
      this.getAllTrainings();
      this.AvailableTrainings = new Array;
    }
  }
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];


  imageDataUrl;
  old_password;
  new_password;
  confirm_password;
  e;
  message;
  messageUpdatePassword;
  messageUpdateInfo;
  messageRequestTraining;
  errorMessage;
  myUsername;
  profilePic;
  user : User;
  nameoftraining;

  changePasswordFlag;

  firstLoginMessage;
  firstLogin : boolean;


  trRequested;
  selectedTraining;
  allTrainings;
  AvailableTrainings : Array<string>;

  wantToAddTraining;

  newDescription;
  infoChangeFlag;

  whichPic;
  srcForImage;

  @ViewChild("mail") mail: ElementRef;
  @ViewChild("city") city: ElementRef;
  @ViewChild("phone") phone: ElementRef;

  getMySelf()
  {
    this.service.getOneUser(this.myUsername).subscribe((ob : User)=>
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
          this.profilePic = this.srcForImage + this.user.username + "/" + this.user.image;
        }

        if(this.user.status == 0)
        {
          this.firstLogin = true;
          this.firstLoginMessage = "Please go "
        }
      }
    });
  }

  wantToChangePassword()
  {
    this.changePasswordFlag = true;
  }

  changePassword()
  {
    if(this.old_password == undefined || this.old_password == null || this.old_password == "") { this.errorMessage = "You must enter all data!"; return; }
    if(this.new_password == undefined || this.new_password == null || this.new_password == "") { this.errorMessage = "You must enter all data!"; return; }
    if(this.confirm_password == undefined || this.confirm_password == null || this.confirm_password == "") { this.errorMessage = "You must enter all data!"; return; }

    this.service.updatePassword(this.myUsername, this.old_password, this.new_password, this.confirm_password).subscribe((ob)=>
    {
      if(ob['user'] == "ok") 
      {
        this.messageUpdatePassword = "Successfully updated password";
        this.errorMessage = "";
        this.changePasswordFlag = false;
      }
      if(ob['user'] == "er1") this.errorMessage = "You havent entered your old password correctly!";
      if(ob['user'] == "er2") this.errorMessage = "New password doesnt match!";
      if(ob['user'] == "er3") this.errorMessage = "Password must have at least 1 upper, 1 lower case, 1 numeric character and must be between 8 and 12 characters long!";

    })
  }

  update()
  {
    let username = this.myUsername;
    let city = this.city.nativeElement.value;
    let phone = this.phone.nativeElement.value;
    let mail = this.mail.nativeElement.value;

    this.service.updateOneUser(username, mail, city, phone).subscribe((ob)=>
    {
      if(ob['user'] == "ok")
      {
        this.messageUpdateInfo = "Successfully updated information!";
      }
      this.getMySelf();
    })
  }

  addTrainings()
  {
    this.wantToAddTraining = true;
  }

  getAllTrainings()
  {
    this.service.getAllTrainings().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.allTrainings = ob;  
      }
      let isSame;
      let nm1;
      let nm2;
      let ind = 0;

      if(this.user.listoftrainings.length == 0)
      {
        for(let i = 0; i < this.allTrainings.length; i++)
        {
          nm1 = this.allTrainings[i].name;
          this.AvailableTrainings[ind++] = nm1;
        }
      }
      else
      {
        for(let i = 0; i < this.allTrainings.length; i++)
        {
          isSame = false;
          for(let j = 0; j <this.user.listoftrainings.length; j++)
          {
            nm1 = this.allTrainings[i].name;
            nm2 = this.user.listoftrainings[j];
  
            if(nm1 === nm2)
            {
              isSame = true;
              break;
            }
          }
          if(!isSame)
          {
  
            this.AvailableTrainings[ind++] = nm1;
          }
          
        }
      }

   
    })

  }

  infoChange()
  {
    this.infoChangeFlag = true;
  }

  changeMyDesc()
  {
    this.service.changeTrainerDesc(this.myUsername, this.newDescription).subscribe((ob)=>
   {
     if(ob['user'] == 'ok')
     {
      this.messageRequestTraining = "You have successfully updated a description."
      this.infoChangeFlag = false;
     }
   })
  }

  AddTraining()
  {
   this.service.requestTraining(this.myUsername, this.selectedTraining).subscribe((ob)=>
   {
     if(ob['user'] == 'ok')
     {
      this.messageRequestTraining = "You have successfully requested a training."
     }
   })
  }
}
