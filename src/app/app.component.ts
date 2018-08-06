import { Component } from '@angular/core';
import { App, Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SchoolPlanPage } from '../pages/schoolplan/schoolplan'
import { AccidentInsurancePage } from '../pages/accidentinsurance/accidentinsurance'
import { MedicalCarePage } from '../pages/medicalcare/medicalcare';
import { ProfilePage } from '../pages/profile/profile';

//import { CompletarAvisoPage } from '../pages/completaraviso/completaraviso';

import { SharedService } from '../providers/shared-service';

@Component({
  templateUrl: 'app.html'
})
export class CaintraApp {
  rootPage: any = LoginPage; //LoginPage;
  loginPage = LoginPage;
  menu: any;
  app: any;
  platform: any;
  userPolizas: any = {};

  constructor(
    platform: Platform,
    app: App,
    menu: MenuController,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private dataShare: SharedService
  ) {
    this.menu = menu;
    this.app = app;
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }


  goSchoolPlan() {
    this.userPolizas = this.dataShare.getUserData().Polizas;
    if(this.userPolizas.length==0){
      this.showInfo("Lo sentimos, ya no tienes una póliza vigente.");
      this.menu.close();
      return;
    }
      this.app.getActiveNav().push(SchoolPlanPage);
      this.menu.close();
  }

  goAccidentInsurance() {
    this.userPolizas = this.dataShare.getUserData().Polizas;
    if(this.userPolizas.length==0){
      this.showInfo("Lo sentimos, ya no tienes una póliza vigente.");
      this.menu.close();
      return;
    }
    this.app.getActiveNav().push(AccidentInsurancePage);
    this.menu.close();
  }

  goMedicalCare() {
    this.userPolizas = this.dataShare.getUserData().Polizas;
    if(this.userPolizas.length==0){
      this.showInfo("Lo sentimos, ya no tienes una póliza vigente.");
      this.menu.close();
      return;
    }
    this.app.getActiveNav().push(MedicalCarePage);
    this.menu.close();
  }

  goProfile() {
    this.app.getActiveNav().push(ProfilePage);
    this.menu.close();
  }

  goHome() {
    this.app.getActiveNav().push(HomePage);
    this.menu.close();
  }

  closeApp() {
    //this.app.getActiveNav().push(LoginPage);
    //this.menu.close();
    //ionic.Platform.exitApp();
    this.platform.exitApp();
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
