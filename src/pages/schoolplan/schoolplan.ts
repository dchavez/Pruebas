import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { UserService } from '../../providers/user-service';
import { SharedService } from '../../providers/shared-service';

@Component({
    selector: 'page-schoolplan',
    templateUrl: 'schoolplan.html'
})
export class SchoolPlanPage {
  userData: any = {};
  userEmpresa: any = {};
  userPoliza: any = {};
  token: any = {};

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private dataShare: SharedService
  ) {
    this.token = this.dataShare.getToken();
    this.userData = this.dataShare.getUserData().Generales;
    this.userEmpresa = this.dataShare.getUserData().Empresa;
    this.userPoliza = this.dataShare.getUserData().Poliza;
    this.initData();
  }

  initData() {

  }


}
