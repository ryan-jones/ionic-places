import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { MapLocation } from '../../app/models/location.model';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  private location: MapLocation = {
    lat: 40.7624324,
    lng: -73.9759827
  }
  private locationIsSet = false;
  constructor(private modalCtrl: ModalController, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  onSubmit(form: NgForm) {
    console.log('form', form);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, { location: this.location, isSet: this.locationIsSet });
    modal.present();
    modal.onDidDismiss(data => {
      this.location = data ? data.location : this.location;
      this.locationIsSet = true;
    })
  }

  onLocate() {
    this.geolocation.getCurrentPosition()
      .then(location => {
        console.log('location', location);
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;
      })
      .catch(error => console.log('error', error));
  }
}
