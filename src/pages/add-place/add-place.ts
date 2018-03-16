import { Component } from '@angular/core';
import { ModalController, LoadingController, ToastController, normalizeURL } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { MapLocation } from '../../app/models/location.model';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { PlacesService } from '../../services/places.service';
import { File } from '@ionic-native/file';

declare const cordova: any;

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
  private imagePath: string = '';

  constructor(
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private placesService: PlacesService,
    private file: File) {
  }

  onSubmit(form: NgForm) {
    const { title, description } = form.value
    this.placesService.addPlace(title, description, this.location, this.imagePath);
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imagePath = '';
    this.locationIsSet = false;
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, { location: this.location, isSet: this.locationIsSet });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.location =  data.location;
        this.locationIsSet = true;
      }
    })
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your location'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(location => {
        loader.dismiss();
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;
      })
      .catch(error => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Could not get location!',
          duration: 2000
        });
        toast.present();
      });
  }

  onTakePhoto() {
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(picture => {
        const currentName = picture.replace(/^.*[\\\/]/, '');
        const path = picture.replace(/[^\/]*$/, '');
        const newFileName = new Date().getUTCMilliseconds() + '.jpg';
        this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
          .then(data => {
            const toast = this.toastCtrl.create({
              message: 'file moved!',
              duration: 3000
            });
            toast.present();
            this.imagePath = data.nativeURL;
            this.camera.cleanup();
          })
          .catch(err => {
            this.imagePath = '';
            const toast = this.toastCtrl.create({
              message: 'Could not save the image!',
              duration: 2500
            });
            toast.present();
            this.camera.cleanup();
          })
          ;
        this.imagePath = normalizeURL(picture);
      })
      .catch(error => {
        this.imagePath = '';
        const toast = this.toastCtrl.create({
          message: 'Unable to take picture',
          duration: 2000
        });
        toast.present();
      });
  }
}
