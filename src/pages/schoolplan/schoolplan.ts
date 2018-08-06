import { Component } from '@angular/core';
import { App, MenuController, Platform, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';

import { HomePage } from '../home/home';
import { UserService } from '../../providers/user-service';
import { SharedService } from '../../providers/shared-service';

declare var cordova: any;

@Component({
    selector: 'page-schoolplan',
    templateUrl: 'schoolplan.html'
})
export class SchoolPlanPage {
  userData: any = {};
  userEmpresa: any = {};
  userPoliza: any = {};
  userEmpresas: any = {};
  userPolizas: any = {};
  token: any = {};
  storageDirectory: string = '';
  logoUni: string = '';
  loading: Loading;
  selectOptions: any = {};
  app: any;

  constructor(
    app: App,
    public platform: Platform,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public menu: MenuController,
    public userService: UserService,
    private dataShare: SharedService,
    private transfer: FileTransfer,
    private fileOpener: FileOpener
  ) {
    this.app = app;
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
    this.logoUni = "http://peev2.topsoluciones.com.mx/images/logoUniversidad/" + this.userData.LogoUniversidad;
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
      title: 'Empresas',
      subTitle: 'Selecciona tu empresa...',
      mode: "md"
    };
  }

  downloadPEE() {
    this.showLoading();
    var aviso = {
      Token : this.token,
      //Poliza: this.userEmpresa.Poliza,
      ClavePoliza: this.userEmpresa.ClavePoliza
    };
    this.userService.getGeneratePEE(aviso).subscribe(
      (data) => {
        const fileTransfer: FileTransferObject = this.transfer.create();
        const url = data.Uri; //'http://webapicaintra.segupoliza.com/docs/pee.pdf';
        fileTransfer.download(url, this.storageDirectory + 'pee.pdf').then((entry) => {
          this.loading.dismiss();
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showInfo(text) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
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
