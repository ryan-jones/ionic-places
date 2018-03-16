import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../app/models/place.model';
import { PlacesService } from '../../services/places.service';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public addPlacePage = AddPlacePage;
  private places: Place[] = [];

  constructor(public modalCtrl: ModalController, private placesService: PlacesService) {
  }

  ngOnInit() {
    this.placesService.fetchPlaces().then((places: Place[]) => this.places = places);
  }

  ionViewWillEnter() {
   this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, { place, index });
    modal.present();
    modal.onDidDismiss(() => this.places = this.placesService.loadPlaces());
  }
}
