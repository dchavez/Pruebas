import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { ReembolsoPage } from '../reembolso/reembolso';
import { PagoDirectoPage } from '../pagodirecto/pagodirecto';

import { UserService } from '../../providers/user-service';

@Component({
    selector: 'page-medicalcare',
    templateUrl: 'medicalcare.html'
})
export class MedicalCarePage {
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.initData();
  }

  initData() {

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

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
