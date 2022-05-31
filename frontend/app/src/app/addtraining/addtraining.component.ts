import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-addtraining',
  templateUrl: './addtraining.component.html',
  styleUrls: ['./addtraining.component.css']
})
export class AddtrainingComponent implements OnInit {

  constructor(private router : Router, private services : ServicesService) { }

  ngOnInit(): void {
    this.newName = "";
    this.newDescription = "";
    this.newDuration = "";
    this.newIntensity = "";
    this.getAllTrainings();
  }

  allTrainings;
  wantToUpdateFlag;
  nameForUpdate;

  newName;
  newDescription;
  newDuration;
  newIntensity;
  toUpdate;

  message;


  e;
  
  dummyFunction()
  {
	  console.log("Dummy function frontend");
  }


  wantToUpdate(name)
  {
    this.nameForUpdate = name;
    this.wantToUpdateFlag = true;
  }

  deleteTraining(name)
  {
    this.services.deleteTraining(name).subscribe((ob)=>
    {
      if(ob['training'] == "ok")
      {
        alert("Training successfully deleted!");
      }
    })
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
      this.services.send_photos(this.e, idd).subscribe((ob) =>
      {
        if(ob['status'] == "uploaded") alert('Photo added');
      })

    }
    else this.message = "Please add files to upload!";

  }


  addTraining()
  {

    if (this.newName == null || this.newName == undefined || this.newName == "")
    {
      this.message = "You must enter all data"
      return;
    }
    
    if (this.newDescription == null || this.newDescription == undefined || this.newDescription == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.newDuration == null || this.newDuration == undefined || this.newDuration == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.newIntensity == null || this.newIntensity == undefined || this.newIntensity == "")
    {
      this.message = "You must enter all data"
      return;
    }
    
    this.services.addTraining(this.newName, this.newDescription, this.newDuration, this.newIntensity).subscribe((ob)=>
    {
      if(ob['training'] == 'ok') alert("New training added");
    })

    this.uploadPhoto(this.newName);

    this.ngOnInit();


  }


  updateOne(training)
  {

    if(this.newDescription == "" || this.newDescription == undefined) this.newDescription = training.description;
    if(this.newDuration == "" || this.newDuration == undefined) this.newDuration = training.duration;
    if(this.newIntensity == "" || this.newIntensity == undefined) this.newIntensity = training.intensity;

    this.services.updateTraining(training.name, this.newDescription, this.newDuration, this.newIntensity).subscribe((ob)=>
    {
      if(ob['training'] == "ok")
      {
        alert('Training updated succesfully!');
        this.newDescription = "";
        this.newDuration = "";
        this.newIntensity = "";
        this.nameForUpdate = "";
        this.toUpdate = false;
        this.wantToUpdateFlag = false;
        this.getAllTrainings();
      }
    })
  }

  getAllTrainings()
  {
    this.services.getAllTrainings().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.allTrainings = ob;
      }
    })
  }
}
