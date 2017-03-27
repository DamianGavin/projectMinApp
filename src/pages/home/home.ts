import { Component } from '@angular/core';
// Imported to check platform is ready before calling plugins
import { Platform } from 'ionic-angular';
// Imported to use Camera
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  // Create string to store image
  public base64Image: string;
  // Creating camera options object called options. This will be passed to the getPicture() method later.
  options: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
  }
  // For GoogleMap
  map: GoogleMap;
  // Create numbers to hold longitude and latitude for Map
  public longtitude: number;
  public latitude: number;
  public photoLocation: LatLng;
  position: CameraPosition;
  markerOptions: MarkerOptions;
  photoMarker: Marker;

  constructor(private camera: Camera, public platform: Platform, private geolocation: Geolocation, private googleMaps: GoogleMaps) {
    this.platform.ready().then(() => { 
      this.loadMap();
    });
  }//constructor

  loadMap() { 
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    this.map = this.googleMaps.create(element);
    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));
  }

  takePicture(){
    // wait for `ondeviceready` or use `platform.ready()` if you're using Ionic Framework 2.
    this.platform.ready().then(() => { // remember to injected platform in your constructor
      this.camera.getPicture(this.options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.geolocation.getCurrentPosition().then(pos => {
        
          this.latitude = pos.coords.latitude;
          this.longtitude = pos.coords.longitude;
          
          this.photoLocation = new LatLng(this.latitude, this.longtitude);
          
          this.position = {
            target: this.photoLocation,
            zoom: 6,
            tilt: 30
          };

          // move the map's camera to position
          this.map.moveCamera(this.position);

          this.markerOptions = {
          position: this.photoLocation,
          title: 'Photo Location'
          };

          this.map.addMarker(this.markerOptions)
            .then((photoMarker) => {
              photoMarker.showInfoWindow();
            }, (error) => {
              alert("Marker error");
              console.log(error);
            })

        }, (error) => {
          alert("Error on geolaocation");
          console.log(error); 
     })//Geolocation



      }, (error) => {
        alert("issue with camera");
        console.log(error);
      })//Camera
    })//Platform
  }//takePicture
}//Class
