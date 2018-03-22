import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { MedicalCarePage } from '../medicalcare/medicalcare';
import { SharedService } from '../../providers/shared-service';

import { UserService } from '../../providers/user-service';

@Component({
    selector: 'page-accidentinsurance',
    templateUrl: 'accidentinsurance.html'
})
export class AccidentInsurancePage {
  loading: Loading;
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

  goMedicalCare() {
    let _this = this;

    this.navCtrl.push(MedicalCarePage).then(data => {
      console.log('AtencionMedicaPorAccidentes', data);
    }, (error) => {
      _this.showError("Access Denied");
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: '',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
