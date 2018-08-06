import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, Loading } from 'ionic-angular';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';

import { CompletarAvisoPage } from '../completaraviso/completaraviso';

import { UserService } from '../../providers/user-service';

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
  userEmpresas: any = {};
  userPolizas: any = {};
  token: any = {};
  loading: Loading;
  storageDirectory: string = '';
  selectOptions: any = {};

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public userService: UserService,
    private dataShare: SharedService,
    private transfer: FileTransfer,
    private fileOpener: FileOpener
  ) {
    var i = 0;
    this.token = this.dataShare.getToken();
    this.userData = this.dataShare.getUserData().Generales;
    this.userEmpresas = this.dataShare.getUserData().Empresas;
    this.userEmpresa = this.userEmpresas[0];
    this.userPolizas = this.dataShare.getUserData().Polizas;
    this.userPoliza = this.userPolizas[0];
    if(this.userPolizas.length>1){
      for(i=0;i<this.userPolizas.length;i++){
        if(this.userPolizas[i].ClavePoliza == this.userEmpresa.ClavePoliza){
          this.userPoliza = this.userPolizas[i];
          break;
        }
      }
    }
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
    });
    this.selectOptions = {
      title: 'Pólizas',
      subTitle: 'Selecciona tu póliza...',
      mode: "md"
    };
  }

  changeEmpresa(){
    var i = 0;
    if(this.userPolizas.length>1){
      for(i=0;i<this.userPolizas.length;i++){
        if(this.userPolizas[i].ClavePoliza == this.userEmpresa.ClavePoliza){
          this.userPoliza = this.userPolizas[i];
          break;
        }
      }
    }
  }

  downloadAvisoAccidente() {
    this.showLoading();
    var aviso = {
      Token : this.token,
      NombreAfectado : this.userData.NombreCompleto,
      Poliza: this.userPoliza.Poliza,
      ClavePoliza: this.userPoliza.ClavePoliza
    };
    this.userService.getGenerateAvisoEmpty(aviso).subscribe(
      (data) => {
        const fileTransfer: FileTransferObject = this.transfer.create();
        const url = data.Uri; //'http://webapicaintra.segupoliza.com/docs/AvisoAccidentes.pdf';
        fileTransfer.download(url, this.storageDirectory + 'AvisoAccidentes.pdf').then((entry) => {
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

  // downloadAvisoAccidente() {
  //   this.showLoading();
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   const url = 'http://webapicaintra.segupoliza.com/docs/AvisoAccidentes.pdf';
  //   fileTransfer.download(url, this.storageDirectory + 'AvisoAccidentes.pdf').then((entry) => {
  //     this.loading.dismiss();
  //     this.fileOpener.open(entry.toURL(), 'application/pdf')
  //       .then(() => console.log('File is opened'))
  //       .catch(e => console.log('Error openening file', e));
  //   }, (error) => {
  //     console.log(error);
  //     this.showInfo("Error al descargar el documento");
  //   });
  // }

  goCompletarAviso() {
    this.dataShare.setPolicy(this.userPoliza);
    this.navCtrl.push(CompletarAvisoPage).then(data => {
      //console.log('Profile', data);
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
