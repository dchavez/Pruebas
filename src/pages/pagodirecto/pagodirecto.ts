import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, Loading } from 'ionic-angular';

//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';

import { CompletarAvisoPage } from '../completaraviso/completaraviso';

import { SharedService } from '../../providers/shared-service';

declare var cordova: any;

@Component({
    selector: 'page-pagodirecto',
    templateUrl: 'pagodirecto.html'
})
export class PagoDirectoPage {
  userData: any = {};
  userEmpresa: any = {};
  userPoliza: any = {};
  token: any = {};
  loading: Loading;

  storageDirectory: string = '';

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private dataShare: SharedService,
    public platform: Platform,
    //private transfer: FileTransfer,
    //private file: File
  ) {
    this.token = this.dataShare.getToken();
    this.userData = this.dataShare.getUserData().Generales;
    this.userEmpresa = this.dataShare.getUserData().Empresa;
    this.userPoliza = this.dataShare.getUserData().Poliza;
    this.initData();

    this.platform.ready().then(() => {
      if (!this.platform.is('cordova')) {
        return false;
      }
      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if (this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        return false;
      }
    })

  }

  initData() {

  }

  downloadAvisoAccidente() {

  }

  //downloadImage(image) {

  //  this.platform.ready().then(() => {

  //    const fileTransfer: TransferObject = this.transfer.create();

  //    const imageLocation = `${cordova.file.applicationDirectory}www/assets/img/${image}`;

  //    fileTransfer.download(imageLocation, this.storageDirectory + image).then((entry) => {

  //      const alertSuccess = this.alertCtrl.create({
  //        title: `Download Succeeded!`,
  //        subTitle: `${image} was successfully downloaded to: ${entry.toURL()}`,
  //        buttons: ['Ok']
  //      });

  //      alertSuccess.present();

  //    }, (error) => {

  //      const alertFailure = this.alertCtrl.create({
  //        title: `Download Failed!`,
  //        subTitle: `${image} was not successfully downloaded. Error code: ${error.code}`,
  //        buttons: ['Ok']
  //      });

  //      alertFailure.present();

  //    });

  //  });
  //}

    goCompletarAviso() {
      this.navCtrl.push(CompletarAvisoPage).then(data => {
        console.log('Profile', data);
      }, (error) => {
        this.showError("Access Denied");
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
      alert.present(prompt);
    }

}
