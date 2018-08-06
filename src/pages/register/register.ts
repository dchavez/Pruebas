import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import { UserService } from '../../providers/user-service';
import { SharedService } from '../../providers/shared-service';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
  homePage = HomePage;
  loading: Loading;
  step1 = true;
  step2 = false;
  step3 = false;
  registerCredentials = { email: '', password: '' };
  token: any = {};
  userData: any = {};
  data: any = {};
  rec = {
    rfc: '',
    tel: '',
    email: '',
    pwd: '',
    pwd2: '',
    UID: '',
    Matricula: ''
  };

    constructor(
      public navCtrl: NavController,
      public menu: MenuController,
      public navParams: NavParams,
      public userService: UserService,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      public dataShare: SharedService
    ) {
      this.menu = menu;
      this.menu.enable(false, 'mnuMain');
    }

    public next() {

      if(this.rec.rfc==""){
        return;
      }

      this.showLoading();

      this.userService.getDataUserFromRFC(this.rec.rfc).subscribe(
        (data) => {
          this.data = data;
          if(data.Error!=""){
            this.showError(data.Error);
            return;
          }
          if(data.Matricula==""||data.UID==""){
            this.showError("No se encontro al usuario asociado a este RFC.");
            return;
          }
          this.rec.UID = data.UID;
          this.rec.Matricula = data.Matricula;
          this.rec.tel = data.Celular;
          this.rec.email = data.EMail;
          this.step1 = false;
          this.step2 = true;
          this.step3 = false;
          this.loading.dismiss();
        },
        (error) => {
          this.showError("No se encontro al usuario asociado a este RFC.");
        }
      )

    }

    public create() {

      if(this.rec.tel==""||this.rec.email==""||this.rec.pwd==""||this.rec.pwd2==""){
        return;
      }


      if(this.rec.pwd!=this.rec.pwd2){
        this.showError("La contraseña con la confirmación de la misma, no son iguales, intente de nuevo.");
        this.rec.pwd2 = "";
        return;
      }

      this.showLoading();

      let dataValue = {
        UID: this.rec.UID,
        Matricula: this.rec.Matricula,
        RFC: this.rec.rfc,
        Telefono: this.rec.tel,
        Login: this.rec.email,
        Password: this.rec.pwd
      };

      this.registerCredentials = { email: dataValue.Login, password: dataValue.Password };

      this.userService.setDataUserCreate(dataValue).subscribe(
        (data) => {
          this.userService.getLogin(this.registerCredentials).subscribe(
            (data) => {
              this.token = data.Token;
              this.dataShare.setToken(this.token);
              this.userService.getDataUser(this.token).subscribe(
                (data) => {
                  this.userData = data.Generales;
                  this.dataShare.setUserData(data);
                  this.step1 = false;
                  this.step2 = false;
                  this.step3 = true;
                  this.loading.dismiss();
                },
                (error) => {
                  this.showError("Token no válido");
                  this.navCtrl.setRoot(LoginPage).then(data => {
                  }, (error) => {
                  });
                }
              )
            },
            (error) => {
              this.showError("El usuario fue creado pero se le a denegado el acceso, intente firmarse manualmente.");
            }
          )
        },
        (error) => {
          this.showError("No se pudo crear al usuario revise sus datos e intente de nuevo.");
        }
      )
    }

    public gohome() {
      this.navCtrl.setRoot(HomePage).then(data => {

      }, (error) => {
        this.showError("Acceso denegado");
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
      alert.present();
    }

}
