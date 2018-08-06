import { Component } from '@angular/core';
import { MenuController, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { UserService } from '../../providers/user-service';

import { SharedService } from '../../providers/shared-service';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
  loading: Loading;
  userData: any = {};
  rec = {
    pwd: '',
    pwd2: ''
  };
  showChangePwd = false;
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
  }

  viewChangePwd(){
    this.showChangePwd = true;
  }

  changePwd(){

    if(this.rec.pwd==""||this.rec.pwd2==""||this.rec.pwd!=this.rec.pwd2){
      return;
    }

    this.showLoading();

    this.userService.getChangePassword({Token: this.token, Pwd: this.rec.pwd}).subscribe(
      (data) => {
        this.loading.dismiss();
        this.showChangePwd = false;
      },
      (error) => {
        this.showError("Error al cambiar la contraseña.");
      }
    )
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
