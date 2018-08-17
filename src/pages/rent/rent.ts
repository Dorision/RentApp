import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs-page/tabs-page';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rent',
  templateUrl: 'rent.html',
})
export class RentPage {

  
  m :any;
  userId = '';
  username = '';
  rentData : {product : string,renter:string,lat:number,lng:number }={product:'1',renter:'',lat:0.0,lng:0.0};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentPage');
    this.getProducts()
  }

  doRent() {
    this.rentData ={product:'1',renter:this.userId,lat:0.0,lng:0.0};
    this.restProvider.rent(this.rentData).subscribe(result => {
      this.m = result
      localStorage.setItem('rent',this.rentData.product);
  
      this.navCtrl.setRoot(TabsPage);
    }, err => {
      console.log(err)
      
    });
  }

  getProducts() {
    this.username = localStorage.getItem('token');
    console.log(this.username);
    this.restProvider.getUser(this.username).then(data => {
      this.userId = data[0].id;
      console.log(data);
    });
  }

}
