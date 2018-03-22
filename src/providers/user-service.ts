import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constant from '../app/app.constants';

@Injectable()
export class UserService {

  constructor(public http: Http) {

  }

  getLogin(credentials) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify({
      Login: credentials.email,
      Pwd: credentials.password
    });

    return this.http.post(Constant.API_ENDPOINT+'api/Caintra/Login', data, options).map(res => res.json());
  }

  getDataUser(token) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify({
      value: token
    });

    return this.http.post(Constant.API_ENDPOINT + 'api/Caintra/Generales', data, options).map(res => res.json());
    //return this.http.get('http://www.mocky.io/v2/5a20c52f2d0000f503dfffd2').map(res => res.json());
  }

}
