import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://cornicstudio.pythonanywhere.com/api'
  loginUrl = 'http://cornicstudio.pythonanywhere.com/rest-auth'

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }


  getProduct(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/product/?format=json').subscribe(data => {
        resolve(data);
    }, err => {
      console.log(err)
    });
  });
  }

  getUser(user:string){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/user/?format=json&username='+user).subscribe(data => {
        resolve(data);
    }, err => {
      console.log(err)
    });
  });
  }

  login(data: any){
    
    return this.http.post(this.loginUrl + '/login/?format=json',data);
  }

  rent(data:any){
    return this.http.post(this.apiUrl + '/rent/?format=json', data);
  }

}
