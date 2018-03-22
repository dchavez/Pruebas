import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { UserService } from '../../providers/user-service';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public userService: UserService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.initData();
  }

  initData() {

  }


}
