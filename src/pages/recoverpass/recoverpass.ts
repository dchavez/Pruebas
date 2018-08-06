import { Component } from '@angular/core';
import { MenuController, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { UserService } from '../../providers/user-service';


@Component({
  selector: 'page-recoverpass',
  templateUrl: 'recoverpass.html',
})
export class RecoverpassPage {
  loading: Loading;
  successChangePwd = false;
  email: any = "";

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {

  }

  recoverPass(){
    if(this.email==""){
      return;
    }

    this.showLoading();

    this.userService.getRecoverPassword(this.email).subscribe(
      (data) => {
        this.successChangePwd = true;
        this.loading.dismiss();
      },
      (error) => {
        this.showError("No se encontro al usuario asociado a este email.");
      }
    )

  }

  successRecoverPass(){
    this.navCtrl.pop();
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
    alert.present();
  }

  showInfo(text) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
