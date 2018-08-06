import { Component } from '@angular/core';

import { MenuController, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { RecoverpassPage } from '../recoverpass/recoverpass';

import { UserService } from '../../providers/user-service';
import { SharedService } from '../../providers/shared-service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
  homePage = HomePage;
  registerPage = RegisterPage;
  recoverPass = RecoverpassPage;
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  token: any = {};

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public dataShare: SharedService
  ) {
    this.menu = menu;
    this.menu.enable(false, 'mnuMain'); //persistent = "true"
    dataShare.setToken("");
  }

  public createAccount() {
    let _this = this;

    this.showLoading();

    this.registerCredentials = { email: '', password: '' };

    this.navCtrl.push(RegisterPage).then(data => {
      console.log('Registro', data);
    }, (error) => {
      _this.showError("Access Denied");
    });

    //let _this = this;
    //_this.navCtrl.setRoot(RegisterPage).then(data => {
    //  console.log('register', data);
    //}, (error) => {
    //  console.log('error', error);
    //  _this.showError("Access Denied");
    //});
  }

  public recoverPassword(){
    this.navCtrl.push(RecoverpassPage).then(data => {
    }, (error) => {
    });
  }

  public login() {
    let _this = this;

    if(this.registerCredentials.email==""||this.registerCredentials.password==""){
      return;
    }

    this.showLoading();

    this.userService.getLogin(_this.registerCredentials).subscribe(
      (data) => {
        _this.token = data.Token;
        _this.dataShare.setToken(_this.token);
        _this.navCtrl.setRoot(HomePage).then(data => {
        }, (error) => {
          _this.showError("Acceso denegado");
        });
      },
      (error) => {
        _this.showError("Acceso denegado");
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

}
