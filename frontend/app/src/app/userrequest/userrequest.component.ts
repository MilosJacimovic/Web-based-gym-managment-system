import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-userrequest',
  templateUrl: './userrequest.component.html',
  styleUrls: ['./userrequest.component.css']
})
export class UserrequestComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.noExpired = false;
    this.noExpiredMessage = "";
    this.myUsername = localStorage.getItem("myUsername");
    let isAdmon = localStorage.getItem("typeOfUser");
    this.srcForImage = "http://localhost:4000/static/";
    this.imageDataUrl = '../../assets/generic-profile.png';
    if(isAdmon !== "admin" && isAdmon !== "trainer") this.router.navigate(['/homepage']);
    else{ this.getAllUsers(); this.getExpiredUsers(); }
  }

  myUsername;
  users;
  message;
  newName;
  newSurname;
  wantToUpdate;
  unameForUpdate;
  type = 1;
  newType;

  srcForImage;
  expired;
  noExpired;
  noExpiredMessage;
  imageDataUrl;

  file_uploaded_message;
  error_file_uploaded_message
  e;

  selectedType;

  getAllUsers()
  {
    this.services.getAllUsers().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.users = ob;
      }
    })
  }

  getExpiredUsers()
  {
    this.services.getExpiredUsers().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.expired = ob;
      }

      if(this.expired.length == 0)
      {
        this.noExpired = true;
        this.noExpiredMessage = "No users with exired memberships"
      }
    })
  }

  approve(username)
  {
    this.services.approveUser(username).subscribe((ob)=>
    {
      if(ob['user'] == "ok") alert('User approved succesfully!');
      this.getAllUsers();

    });
  } 

  file_change(e)
  {
    this.e = e;
    this.getAllUsers();
  }

  uploadJson()
  {
    if(this.e != null)
    {
      this.file_change(this.e);
      this.services.send_file(this.e);
      console.log(this.e);
      this.file_uploaded_message = "Successfuly uploaded file";
      this.getAllUsers();
    }
    else this.error_file_uploaded_message = "Please add files to upload!";
  }

  delete(username)
  {
    this.services.deleteUser(username).subscribe((ob)=>
    {
      if(ob['user'] == "ok") alert('User deleted succesfully!');
      this.getAllUsers();
    });
  }

  decline(username)
  {
    this.services.deleteUser(username).subscribe((ob)=>
    {
      if(ob['user'] == "ok") alert('User deleted succesfully!');
      this.getAllUsers();
    });
  }

  update(uUsername) 
  {
      this.unameForUpdate = uUsername;
      this.wantToUpdate = true;
  }

  updateUser(username, uType)
  {
    if(this.newType == "" || this.newType == undefined) this.newType = uType;

    this.services.updateUser(username, this.newType).subscribe((ob)=>
    {
      if(ob['user'] == "ok") 
      {
        alert('User updated succesfully!');
        this.newName = "";
        this.newSurname = "";
        this.newType = "";
        this.wantToUpdate = false;
      }
      this.getAllUsers();
    });
  }

  avatarUpload(username)
  {
    localStorage.setItem("unameavatar", username);
    this.router.navigate(['/changeprofilepic'])
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
