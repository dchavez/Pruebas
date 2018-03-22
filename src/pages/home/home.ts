import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';
import { SchoolPlanPage } from '../schoolplan/schoolplan'
import { AccidentInsurancePage } from '../accidentinsurance/accidentinsurance'
import { MedicalCarePage } from '../medicalcare/medicalcare';
import { ProfilePage } from '../profile/profile';

import { MenuController, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { UserService } from '../../providers/user-service';
import { SharedService } from '../../providers/shared-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: Loading;

  userData: any = {};
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
    this.menu = menu;
    this.menu.enable(true, 'mnuMain'); //persistent = "true"
    this.initData();
  }
  
  initData() {
    this.getUserData();
  }

  goSchoolPlan() {
    let _this = this;

    this.navCtrl.push(SchoolPlanPage).then(data => {
      console.log('PlanEscuelaEmpresa', data);
    }, (error) => {
      _this.showError("Access Denied");
    });
  }

  goAccidentInsurance() {
    let _this = this;

    this.navCtrl.push(AccidentInsurancePage).then(data => {
      console.log('SeguroDeAccidentes', data);
    }, (error) => {
      _this.showError("Access Denied");
    });
  }

  goMedicalCare() {
    let _this = this;

    this.navCtrl.push(MedicalCarePage).then(data => {
      console.log('AtencionMedicaPorAccidentes', data);
    }, (error) => {
      _this.showError("Access Denied");
    });
  }

  goProfile() {
    let _this = this;

    this.navCtrl.push(ProfilePage).then(data => {
      console.log('Profile', data);
    }, (error) => {
      _this.showError("Access Denied");
    });
  }
  
  getUserData() {
    //this.showLoading();

    this.userService.getDataUser(this.token).subscribe(
      (data) => {
        this.userData = data.Generales;
        this.dataShare.setUserData(data);
      },
      (error) => {
        this.showError("Token no válido");
        this.navCtrl.setRoot(LoginPage).then(data => {
        }, (error) => {
        });
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
    alert.present(prompt);
  }

}
