import { HttpClient, HttpParams, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http : HttpClient) { }

  uri = 'http://localhost:4000';

  uriProba = 'https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp';

  probicaaa()
  {
    const data = 'example;'

    return this.http.get(this.uriProba);
  }

  login(username, password)
  {
    const data =
    {
      username : username,
      password : password
    }

    return this.http.post(`${this.uri}/login`, data);
  }

  register(name, surname, mail, username, password, confpassword, city, phonenumber, type, stat)
  {
    const data =
    {
      name : name,
      surname : surname,
      mail : mail,
      username : username,
      password : password,
      confpassword : confpassword,
      city : city,
      phonenumber : phonenumber,
      type : type,
      status : stat
    }

    return this.http.post(`${this.uri}/register`, data);
  }

  getOneUser(username)
  {
    const data =
    {
      username : username
    }
    return this.http.post(`${this.uri}/getOneUser`, data);
  }

  updateOneUser(username, mail, city, phone)
  {
    const data = 
    {
      username : username,
      mail : mail,
      city : city,
      phone : phone
    }

    return this.http.post(`${this.uri}/updateOneUser`, data);
  }

  updatePassword(username, oldpassword, newpassword, confpassword)
  {
    const data =
    {
      username : username,
      oldpassword : oldpassword,
      newpassword : newpassword,
      confpassword : confpassword
    }

    return this.http.post(`${this.uri}/updatePassword`, data);
  }

  getAllUsers()
  {
    return this.http.get(`${this.uri}/getAllUsers`);
  }

  getApprovedUsers()
  {
    return this.http.get(`${this.uri}/getApprovedUsers`);
  }

  getAllPersonnel()
  {
    return this.http.get(`${this.uri}/getAllPersonnel`);
  }

  approveUser(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.uri}/approveUser`, data);
  }

  file_uploaded_message : String;
  send_file(event) {
    let fileList: FileList = event.target["files"];
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        this.http.post(this.uri + '/api/v1/product/upload_products_file', formData).subscribe(
            data => {
                this.file_uploaded_message = <String>data;
            },
            error => console.log(error) 
        )
    }
}

  deleteUser(username)
  {
    const data = 
    {
      username : username
    }

    return this.http.post(`${this.uri}/deleteUser`, data);
  }

  deleteTraining(name)
  {
    const data = 
    {
      name : name
    }

    return this.http.post(`${this.uri}/deleteTraining`, data);
  }

  updateUser(username, type)
  {
    const data = 
    {
      username : username,
      type : type
    }

    return this.http.post(`${this.uri}/updateUser`, data);
  }

  getAllMemberships()
  {
    return this.http.get(`${this.uri}/getAllMemberships`);
  }

  updateMembership(name, description, duration, price, discount)
  {
    const data =
    {
      name : name,
      description : description,
      duration : duration,
      price : price,
      discount : discount
    }

    return this.http.post(`${this.uri}/updateMembership`, data);
  }

  updateTraining(name, description, duration, intensity)
  {
    const data =
    {
      name : name,
      description : description,
      duration : duration,
      intensity : intensity
    }

    return this.http.post(`${this.uri}/updateTraining`, data);
  }

  getAllTrainings()
  {
    return this.http.get(`${this.uri}/getAllTrainings`);
  }

  getAllGroupTrainings()
  {
    return this.http.get(`${this.uri}/getAllGroupTrainings`);
  }

  getPersonalTraining()
  {
    return this.http.get(`${this.uri}/getPersonalTraining`);
  }
  requestTraining(username, training)
  {
    const data = 
    {
      username : username,
      training : training
    }

    return this.http.post(`${this.uri}/requestTraining`, data);
  }

  acceptTrainingRequest(username, training)
  {
    const data =
    {
      username : username,
      training : training
    }

    return this.http.post(`${this.uri}/acceptTrainingRequest`, data);
  }

  changeTrainerDesc(username, desc)
  {
    const data =
    {
      username : username,
      desc : desc
    }

    return this.http.post(`${this.uri}/changeTrainerDesc`, data);
  }

  send_photos(event, uname) {
    let fileList: FileList = event.target["files"];
    if(fileList.length > 0) {
      let formData = new FormData();
      formData.append('username', uname);
      let nm = fileList.length;
      for(let i  = 0; i < nm; i++)
      {
        let file: File = fileList[i];
        formData.append('avatar', file);
      }

      let params = new HttpParams();
  
      const options = {
        params: params,
        reportProgress: true,
      };
  
      const req = new HttpRequest('POST', `${this.uri}/photo`, formData, options);
      return this.http.request(req);
    }
}

  addTraining(name, description, duration, intensity)
  {
    const data = 
    {
      name : name,
      description : description,
      duration : duration,
      intensity : intensity
    }

    return this.http.post(`${this.uri}/addTraining`, data);
  }

  SendUsMail(firstname, lastname, mail, reason, message)
  {
    const data =
    {
      firstname : firstname,
      lastname : lastname,
      mail : mail,
      reason : reason,
      message : message
    }

    return this.http.post(`${this.uri}/SendUsMail`, data);
  }

  newsLetterRequest(mail)
  {
    const data =
    {
      mail : mail
    }

    return this.http.post(`${this.uri}/newsLetterRequest`, data);
  }

  getNewsLetterSubs()
  {
    return this.http.get(`${this.uri}/getNewsLetterSubs`);
  }

  getNumOfSubs()
  {
    return this.http.get(`${this.uri}/getNumOfSubs`);
  }

  NewsLetterMail(subs, mail, subject, message)
  {
    const data =
    {
      subs : subs,
      mail : mail,
      subject : subject,
      message : message
    }

    return this.http.post(`${this.uri}/NewsLetterMail`, data);
  }

  searchUsers(name, surname)
  {
    const data =
    {
      name : name,
      surname : surname
    }

    return this.http.post(`${this.uri}/searchUsers`, data);
  }

  getExpiredUsers()
  {
    return this.http.get(`${this.uri}/getExpiredUsers`);
  }

  renewMembership(uname)
  {
    const data =
    {
      uname : uname
    }

    return this.http.post(`${this.uri}/renewMembership`, data);
  }

  getAllTrainers()
  {
    return this.http.get(`${this.uri}/getAllTrainers`);
  }

  resetUserDate(uname)
  {
    const data =
    {
      uname : uname
    }

    return this.http.post(`${this.uri}/resetUserDate`, data);
  }

  verifyMail(token)
  {
    const data =
    {
      id : token
    }

     return this.http.post(`${this.uri}/verify`, data);
  }

  getPersonalTrainers()
  {
    return this.http.get(`${this.uri}/getPersonalTrainers`);
  }

  individualTrainingRequest(user, numOfTrainings, trainer, info)
  {
    const data = 
    {
      name : user.name,
      surname : user.surname,
      attendee : user.username,
      phone : user.phone,
      numperweek : numOfTrainings,
      trainer : trainer,
      description : info
    }

    return this.http.post(`${this.uri}/individualTrainingRequest`, data);
  }

  getGym()
  {
    return this.http.get(`${this.uri}/getGym`);
  }

  getMyRequestUser(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.uri}/getMyRequestUser`, data);
  }

  getMyRequestsTrainer(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.uri}/getMyRequestsTrainer`, data);
  }

  acceptPersonalTrainingRequest(attendee, trainer)
  {
    const data =
    {
      attendee : attendee,
      trainer : trainer
    }

    return this.http.post(`${this.uri}/acceptPersonalRequest`, data);
  }

  rejectPersonalTrainingRequest(attendee, trainer)
  {
    const data =
    {
      attendee : attendee,
      trainer : trainer
    }

    return this.http.post(`${this.uri}/rejectPersonalTrainingRequest`, data);
  }

  getUsersInProgressTrainings(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.uri}/getUsersInProgressTrainings`, data);
  }

  getUsersDeninedTrainings(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.uri}/getUsersDeninedTrainings`, data);
  }

  getUsersCompletedTrainings(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.uri}/getUsersCompletedTrainings`, data);
  }

  getTrainersInProgressTrainings(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.uri}/getTrainersInProgressTrainings`, data);
  }

  getTrainersDeninedTrainings(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.uri}/getTrainersDeninedTrainings`, data);
  }

  getTrainersCompletedTrainings(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.uri}/getTrainersCompletedTrainings`, data);
  }

  doneOneTraining(id)
  {
    const data =
    {
      id : id
    }

    return this.http.post(`${this.uri}/doneOneTraining`, data);
  }

  renewPersonalTraining(id)
  {
    const data =
    {
      id : id
    }

    return this.http.post(`${this.uri}/renewPersonalTraining`, data);
  }

  

  canIMakeNewPersonalRequest(myUsername)
  {
    const data =
    {
      myUsername : myUsername
    }

    return this.http.post(`${this.uri}/canIMakeNewPersonalRequest`, data);
  }

  trainerNewGroupTraining(trainer, name, time, max, duration, day)
  {
    const data =
    {
      trainer : trainer,
      name : name,
      time : time,
      max : max,
      duration : duration,
      day : day
    }

    return this.http.post(`${this.uri}/trainerNewGroupTraining`, data);
  }

  getMyWeeklyTrainings(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.uri}/getMyWeeklyTrainings`, data);
  }

  probaQrCode(url)
  {
    const data =
    {
      url : url
    }

    return this.http.post(`${this.uri}/scan`, data);
  }

  probaBase64(sl)
  {
    const data =
    {
      sl : sl
    }

    return this.http.post(`${this.uri}/probaBase64`, data);
  }

  getAllWeeklyGroupTrainings()
  {
    return this.http.get(`${this.uri}/getAllWeeklyGroupTrainings`);
  }

  attendGroupTraining(training, myUsername)
  {
    const data =
    {
      id : training._id,
      uname : myUsername
    }

    return this.http.post(`${this.uri}/attendGroupTraining`, data);
  }

  cancelGroupTraining(training, myUsername)
  {
    const data =
    {
      id : training._id,
      uname : myUsername
    }

    return this.http.post(`${this.uri}/cancelGroupTraining`, data);
  }
}


