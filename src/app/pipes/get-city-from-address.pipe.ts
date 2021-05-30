import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCityFromAddress'
})
export class GetCityFromAddressPipe implements PipeTransform {

  transform(value: any): any {
    const geocoder = new google.maps.Geocoder();
    let city: any;
    return geocoder.geocode({ address: value }, (results, status) => {
      if (status === 'OK') {
        const addressComponents = results[0].address_components;
        city = addressComponents[addressComponents.length - 4].long_name;
        return city;
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
