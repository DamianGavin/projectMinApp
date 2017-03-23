import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
// Imported to check platform is ready before calling plugins
import { Platform } from 'ionic-angular';
// Imported to use Camera
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // Create string to store image
  public base64Image: string;
  // Create numbers to hold longitude and latitude
  public longtitude: number;
  public latitude: number;
  // Creating camera options object called options. This will be passed to the getPicture() method later.
  options: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
  }
  
  constructor(public navCtrl: NavController, private camera: Camera, public platform: Platform, private geolocation: Geolocation) {
  }

  takePicture(){
    // wait for `ondeviceready` or use `platform.ready()` if you're using Ionic Framework 2.
    this.platform.ready().then(() => { // remember to injected platform in your constructor
      this.camera.getPicture(this.options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.geolocation.getCurrentPosition().then(pos => {
          console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
          this.latitude = pos.coords.latitude;
          this.longtitude = pos.coords.longitude;
      });
      }, (error) => {
         console.log(error);
      })
    });
  }
}
