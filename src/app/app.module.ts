import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';

import { CaintraApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SchoolPlanPage } from '../pages/schoolplan/schoolplan';
import { AccidentInsurancePage } from '../pages/accidentinsurance/accidentinsurance';
import { MedicalCarePage } from '../pages/medicalcare/medicalcare';
import { ProfilePage } from '../pages/profile/profile';
import { ReembolsoPage } from '../pages/reembolso/reembolso';
import { PagoDirectoPage } from '../pages/pagodirecto/pagodirecto';
import { CompletarAvisoPage } from '../pages/completaraviso/completaraviso';

import { UserService } from '../providers/user-service';
import { SharedService } from '../providers/shared-service';

@NgModule({
  declarations: [
    CaintraApp,
    LoginPage,
    RegisterPage,
    HomePage,
    AboutPage,
    SchoolPlanPage,
    AccidentInsurancePage,
    MedicalCarePage,
    ProfilePage,
    ReembolsoPage,
    PagoDirectoPage,
    CompletarAvisoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(CaintraApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CaintraApp,
    LoginPage,
    RegisterPage,
    HomePage,
    AboutPage,
    SchoolPlanPage,
    AccidentInsurancePage,
    MedicalCarePage,
    ProfilePage,
    ReembolsoPage,
    PagoDirectoPage,
    CompletarAvisoPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    SharedService,
    //File,
    //FileTransfer
  ]
})
export class AppModule {}
