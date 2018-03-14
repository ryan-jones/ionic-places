import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MapLocation } from '../../app/models/location.model';
@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  private location: MapLocation;
  private marker: MapLocation;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.location = this.navParams.get('location');
    if (this.navParams.get('isSet')) {
      this.marker = this.location;
    }
  }

  onSetMarker(event: any) {
    this.marker = event.coords;
  }

  onConfirm() {
    this.viewCtrl.dismiss({ location: this.marker });
  }

  onAbort() {
    this.viewCtrl.dismiss();
  }
}
