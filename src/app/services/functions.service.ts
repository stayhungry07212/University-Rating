import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  getPosition(): Promise<any> {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0
    };
    return new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        }, options);
    });
  }

  getCityFromAddress(address: string) {
    const geocoder = new google.maps.Geocoder();
    let city;
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const addressComponents = results[0].address_components;
        city = addressComponents[addressComponents.length - 4].long_name;
        return city;
      } else {
        console.log(`%c Geocode was not successful for the following reason: ${status}`, 'color: #ffc107;');
      }
    });
    // return city;
  }

}
