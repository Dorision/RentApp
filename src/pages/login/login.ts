import { Component } from '@angular/core';

import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';


import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  loading: any;
  loginData: { username: string, email: string, password: string } ={ username:'',email:'', password:''};

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,) { }

  doLogin() {
    this.showLoader();
    this.restProvider.login(this.loginData).subscribe(result => {
      this.loading.dismiss();
      localStorage.setItem('token',this.loginData.username);
      this.presentToast(result);
      this.navCtrl.setRoot(TabsPage);
    }, err => {
      this.loading.dismiss();
      this.presentToast(err.status + err.statusText +err.ok);
      
    
      
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
