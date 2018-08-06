import { Component } from '@angular/core';
import { App, MenuController, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ReembolsoPage } from '../reembolso/reembolso';
import { PagoDirectoPage } from '../pagodirecto/pagodirecto';

import { SharedService } from '../../providers/shared-service';

import { UserService } from '../../providers/user-service';

@Component({
    selector: 'page-medicalcare',
    templateUrl: 'medicalcare.html'
})
export class MedicalCarePage {
  loading: Loading;
  userPolizas: any = {};
  app: any;

  constructor(
    app: App,
    public navCtrl: NavController,
    public menu: MenuController,
    public userService: UserService,
    private dataShare: SharedService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.app = app;
    this.userPolizas = this.dataShare.getUserData().Polizas;
    if(this.userPolizas.length==0){
      this.showInfo("Lo sentimos, ya no tienes una póliza vigente.");
      this.app.getActiveNav().push(HomePage);
    }
  }

  goReembolso() {
    let _this = this;

    this.navCtrl.push(ReembolsoPage).then(data => {
      console.log('Profile', data);
    }, (error) => {
      _this.showError("Access Denied");
    });
  }

  goPagoDirecto() {
    let _this = this;

    this.navCtrl.push(PagoDirectoPage).then(data => {
      console.log('Profile', data);
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

  showInfo(text) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
