import { Place } from '../app/models/place.model';
import { MapLocation } from '../app/models/location.model';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Injectable } from '@angular/core';

declare const cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

    constructor(private storage: Storage, private file: File) {}

  addPlace(title: string, description: string, location: MapLocation, imagePath: string) {
    const place = new Place(title, description, location, imagePath);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then()
      .catch(err => this.places.splice(this.places.indexOf(place), 1));
  }

  loadPlaces = () => [...this.places];

  fetchPlaces() {
   return this.storage.get('places')
      .then((places: Place[]) => {
        this.places = places || [];
        return this.places;
      })
      .catch(err => console.log(err));
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(() => {
        this.removeFile(place);
      })
      .catch(err => console.log(err));
  }

  private removeFile(place: Place) {
    const currentName = place.imagePath.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(() => console.log('removed file!'))
      .catch(err => {
        const { title, description, location, imagePath } = place;
        this.addPlace(title, description, location, imagePath);
      })
  }
}
