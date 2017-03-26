import { Component } from '@angular/core';
// Imported to check platform is ready before calling plugins
import { Platform } from 'ionic-angular';
// Imported to use Camera
import { Camera, CameraOptions } from '@ionic-native/camera';


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


  constructor(private camera: Camera, public platform: Platform) {
  }//constructor

  takePicture(){
    // wait for `ondeviceready` or use `platform.ready()` if you're using Ionic Framework 2.
    this.platform.ready().then(() => { // remember to injected platform in your constructor
      this.camera.getPicture(this.options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
      }, (error) => {
        alert("issue with camera");
        console.log(error);
      })//Camera
    })//Platform
  }//takePicture
}//Class
