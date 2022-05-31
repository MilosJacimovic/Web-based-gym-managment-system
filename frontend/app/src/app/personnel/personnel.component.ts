import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.myUsername = localStorage.getItem("myUsername");
    let isAdmon = localStorage.getItem("typeOfUser");
    this.type = isAdmon;
    if(isAdmon !== "admin" && isAdmon !== "trainer") this.router.navigate(['/homepage']);
    else{ this.getAllPersonnel(); }
  }

  personnels;
  myUsername;

  message;
  newName;
  newSurname;
  wantToUpdate;
  wantToUpdateGym
  unameForUpdate;
  type;
  newType;

  file_uploaded_message;
  error_file_uploaded_message
  e;

  getAllPersonnel()
  {
    this.services.getAllPersonnel().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.personnels = ob;
      }
    })
  }

  approve(username)
  {
    this.services.approveUser(username).subscribe((ob)=>
    {
      if(ob['user'] == "ok") alert('User approved succesfully!');
      this.getAllPersonnel();

    });
  } 

  file_change(e)
  {
    this.e = e;
    this.getAllPersonnel();
  }

  uploadJson()
  {
    if(this.e != null)
    {
      this.file_change(this.e);
      this.services.send_file(this.e);
      console.log(this.e);
      this.file_uploaded_message = "Successfuly uploaded file";
      this.getAllPersonnel();
    }
    else this.error_file_uploaded_message = "Please add files to upload!";
  }

  update(username)
  {
    this.unameForUpdate = username;
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
      this.getAllPersonnel();
    });
  }

  delete(username)
  {
    this.services.deleteUser(username).subscribe((ob)=>
    {
      if(ob['user'] == "ok") alert('User deleted succesfully!');
      this.getAllPersonnel();
    });
  }

  decline(username)
  {
    this.services.deleteUser(username).subscribe((ob)=>
    {
      if(ob['user'] == "ok") alert('User deleted succesfully!');
      this.getAllPersonnel();
    });
  }

  acceptTrainingRequest(username, training)
  {
    this.services.acceptTrainingRequest(username, training).subscribe((ob)=>
    {
      if(ob['user'] == "ok") alert('Added training succesfully!');
      this.getAllPersonnel();
    });
  }
}
