import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';

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

    constructor(
      public navCtrl: NavController,
      public menu: MenuController,
      public navParams: NavParams,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController
    ) {
      this.menu = menu;
      this.menu.enable(false, 'mnuMain');
    }

    public next() {
      this.step1 = false;
      this.step2 = true;
      this.step3 = false;
    }

    public create() {
      this.step1 = false;
      this.step2 = false;
      this.step3 = true;
    }

    public gohome() {
      let _this = this;

      _this.navCtrl.setRoot(HomePage).then(data => {

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
