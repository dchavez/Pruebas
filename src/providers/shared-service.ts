import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {

    constructor(public http: Http) {
    }

    token: any;
    userData: any = {};

    setToken(token) {
      this.token = token;
    }

    getToken() {
      return this.token;
    }

    setUserData(userData) {
      this.userData = userData;
    }

    getUserData() {
      return this.userData;
    }

}
