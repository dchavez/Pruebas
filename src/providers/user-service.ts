import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constant from '../app/app.constants';

@Injectable()
export class UserService {

  constructor(
    public http: Http
  ) {
    this.http = http;
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
  }

  getDataUserFromRFC(rfc) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify({
      value: rfc
    });

    return this.http.post(Constant.API_ENDPOINT + 'api/Caintra/ValidateRFC', data, options).map(res => res.json());
  }

  setDataUserCreate(dataValue) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify(dataValue);

    return this.http.post(Constant.API_ENDPOINT + 'api/Caintra/Register', data, options).map(res => res.json());
  }

  getUrlPDFPolicy(policy) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify({
      value: policy
    });

    return this.http.post(Constant.API_ENDPOINT + 'api/Caintra/RecoverPolicyUri', data, options).map(res => res.json());
  }

  getRecoverPassword(email) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify({
      value: email
    });

    return this.http.post(Constant.API_ENDPOINT + 'api/Caintra/RecoverPassword', data, options).map(res => res.json());
  }

  getChangePassword(input) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify(input);

    return this.http.post(Constant.API_ENDPOINT + 'api/Caintra/ChangePassword', data, options).map(res => res.json());
  }

  getGenerateAviso(input){
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify(input);

    return this.http.post(Constant.API_ENDPOINT + 'api/Caintra/AvisoAccidente', data, options).map(res => res.json());
  }

  getGenerateAvisoEmpty(input){
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify(input);

    return this.http.post(Constant.API_ENDPOINT + 'api/Caintra/AvisoAccidente/Empty', data, options).map(res => res.json());
  }

  getGeneratePEE(input){
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

    let options = new RequestOptions({ headers: headers });

    let data = JSON.stringify(input);

    return this.http.post(Constant.API_ENDPOINT + 'api/Caintra/PEE', data, options).map(res => res.json());
  }

}
