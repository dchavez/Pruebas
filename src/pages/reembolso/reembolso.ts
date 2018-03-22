import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { CompletarAvisoPage } from '../completaraviso/completaraviso';

@Component({
    selector: 'page-reembolso',
    templateUrl: 'reembolso.html'
})
export class ReembolsoPage {
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.initData();
  }

  initData() {

  }

    goCompletarAviso() {
      let _this = this;

      this.navCtrl.push(CompletarAvisoPage).then(data => {
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
