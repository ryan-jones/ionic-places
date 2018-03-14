import { Place } from "../app/models/place.model";
import { MapLocation } from "../app/models/location.model";


export class PlacesService {
  private places: Place[] = [];


  addPlace(title: string, description: string, location: MapLocation, imagePath: string) {
    const place = new Place(title, description, location, imagePath);
    this.places.push(place);
  }

  loadPlaces = () => [...this.places];
}
