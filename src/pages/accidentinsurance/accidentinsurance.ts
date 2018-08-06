import { Component } from '@angular/core';
import { App, MenuController, NavController, Platform, AlertController, LoadingController, Loading } from 'ionic-angular';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';

import { HomePage } from '../home/home';
import { MedicalCarePage } from '../medicalcare/medicalcare';
import { SharedService } from '../../providers/shared-service';

import { UserService } from '../../providers/user-service';

declare var cordova: any;

@Component({
    selector: 'page-accidentinsurance',
    templateUrl: 'accidentinsurance.html'
})
export class AccidentInsurancePage {
  loading: Loading;
  userData: any = {};
  userEmpresa: any = {};
  userPoliza: any = {};
  userEmpresas: any = {};
  userPolizas: any = {};
  token: any = {};
  storageDirectory: string = '';
  isvalidissue: boolean = false;
  selectOptions: any = {};
  app: any;

  constructor(
    app: App,
    public platform: Platform,
    public navCtrl: NavController,
    public menu: MenuController,
    public userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private dataShare: SharedService,
    private transfer: FileTransfer,
    private fileOpener: FileOpener
  ) {
    this.app = app;
    var idx = 0;
    this.token = this.dataShare.getToken();
    this.userData = this.dataShare.getUserData().Generales;
    this.userEmpresas = this.dataShare.getUserData().Empresas;
    this.userEmpresa = this.userEmpresas[0];
    this.userPolizas = this.dataShare.getUserData().Polizas;
    this.userPoliza = this.userPolizas[0];
    if(this.userPolizas.length==0){
      this.showInfo("Lo sentimos, ya no tienes una póliza vigente.");
      this.app.getActiveNav().push(HomePage);
      return;
    }
    for(idx = 0; idx < this.userPolizas.length; idx++){
      let ff = Date.parse(this.userPolizas[idx].FinVigencia);
      let fh = Date.parse(new Date().toISOString());
      if(ff > fh){
        this.isvalidissue = true;
      }
    }
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
    this.selectOptions = {
      title: 'Pólizas',
      subTitle: 'Selecciona tu póliza...',
      mode: "md"
    };
  }

  isActive() {
    let ff = Date.parse(this.userPoliza.FinVigencia);
    let fh = Date.parse(new Date().toISOString());
    if(ff > fh){
      return true;
    } else {
      return false;
    }
  }

  goMedicalCare() {
    this.navCtrl.push(MedicalCarePage).then(data => {
    }, (error) => {
      this.showError("Access Denied");
    });
  }

  getPolicy(){
      this.showLoading();
      this.userService.getUrlPDFPolicy(this.userPoliza.Poliza).subscribe(
        (data) => {
          let urlPdf = data.value;
          const fileTransfer: FileTransferObject = this.transfer.create();
          const url = urlPdf;
          fileTransfer.download(url, this.storageDirectory + 'polizaacidente' + '2438' + '.pdf').then((entry) => {
            this.loading.dismiss();
            this.fileOpener.open(entry.toURL(), 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error openening file', e));
          }, (error) => {
            console.log(error);
            this.loading.dismiss();
            this.showInfo("Error al descargar el documento");
          });
        },
        (error) => {
          this.showError("Error al descargar el documento");
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
