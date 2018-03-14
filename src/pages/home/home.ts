import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../app/models/place.model';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public addPlacePage = AddPlacePage;
  private places: Place[] = [];

  constructor(public navCtrl: NavController, private placesService: PlacesService) {
  }

  ionViewWillEnter() {
   this.places = this.placesService.loadPlaces();
   console.log('places', this.places);
  }
}
