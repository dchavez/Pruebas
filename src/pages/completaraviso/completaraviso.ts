import { Component } from '@angular/core';
import { MenuController, Platform, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import moment from 'moment';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';

import { HomePage } from '../home/home';

import { UserService } from '../../providers/user-service';

import { SharedService } from '../../providers/shared-service';

declare var cordova: any;

@Component({
    selector: 'page-completaraviso',
    templateUrl: 'completaraviso.html'
})
export class CompletarAvisoPage {
  storageDirectory: string = '';
  homePage = HomePage;
  loading: Loading;
  userData: any = {};
  token: any = {};
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step5 = false;
  aviso = {
    Token : "",

    NombreAfectado : "",
    EdadAfectado : "",
    NombrePadreMadre : "",
    Domicilio : "",

    LugarAccidente : "",
    FechaYHora : "",
    Descripcion : "",

    NombreJefe : "",
    Puesto : "",
    Telefono : "",
    Email : "",

    Poliza: "",
    ClavePoliza: ""
  };
  userPoliza: any = {};

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public menu: MenuController,
    public userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private dataShare: SharedService,
    private datePicker: DatePicker,
    private transfer: FileTransfer,
    private fileOpener: FileOpener
  ) {
    this.token = this.dataShare.getToken();
    this.userData = this.dataShare.getUserData().Generales;
    this.userPoliza = this.dataShare.getPolicy();
    this.aviso.Token = this.token;
    this.aviso.NombreAfectado = this.userData.NombreCompleto;
    this.platform.ready().then(() => {
      if(!this.platform.is('cordova')) {
        return false;
      }
      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        return false;
      }
    });
    this.paso1();
  }

  calendar(){
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      is24Hour: true,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    }).then(
      date => this.setDateCalendar(date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  setDateCalendar(date){
    this.aviso.FechaYHora = moment(date).format("DD-MMM-YYYY LT");
  }

  paso1() {
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
    this.step5 = false;
  }

  paso2() {
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
    this.step4 = false;
    this.step5 = false;
  }

  paso3() {
    this.step1 = false;
    this.step2 = false;
    this.step3 = true;
    this.step4 = false;
    this.step5 = false;
  }

  paso4() {
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = true;
    this.step5 = false;
  }

  paso5() {
    this.showLoading();
    this.aviso.Poliza = this.userPoliza.Poliza;
    this.aviso.ClavePoliza = this.userPoliza.ClavePoliza;
    this.userService.getGenerateAviso(this.aviso).subscribe(
      (data) => {
        this.loading.dismiss();
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
        this.step4 = false;
        this.step5 = true;
        const fileTransfer: FileTransferObject = this.transfer.create();
        const url = data.Uri;
        fileTransfer.download(url, this.storageDirectory + 'AvisoAccidentes.pdf').then((entry) => {
          this.fileOpener.open(entry.toURL(), 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error openening file', e));
        }, (error) => {
          this.showInfo("Error al descargar el documento");
        });
      },
      (error) => {
        this.showError("Error al generar el aviso de accidente.");
      }
    )
  }

  goHome() {
    this.navCtrl.setRoot(HomePage).then(data => {
    }, (error) => {
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
