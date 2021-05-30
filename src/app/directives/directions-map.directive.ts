import { Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

// You can use any other interface for origin and destination, but it must contain latlng data
export interface ILatLng {
  latitude: number;
  longitude: number;
}

// the will keep typescript from throwing errors w.r.t the google object
declare var google: any;

@Directive({
  selector: '[appDirectionsMap]'
})
export class DirectionsMapDirective implements OnInit, OnChanges {
  @Input() origin: ILatLng;
  @Input() destination: any;
  @Input() showDirection: boolean;

  // We'll keep a single google maps directions renderer instance so we get to reuse it.
  // using a new renderer instance every time will leave the previous one still active and visible on the page
  private directionsRenderer: any;

  // We inject AGM's google maps api wrapper that handles the communication with the Google Maps Javascript
  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  ngOnInit() {
    if (this.origin && this.destination) {
      this.drawDirectionsRoute();
    }
  }

  drawDirectionsRoute() {
    this.gmapsApi.getNativeMap().then(map => {
      if (!this.directionsRenderer) {
        // if you already have a marker at the coordinate location on the map, use suppressMarkers option
        // suppressMarkers prevents google maps from automatically adding a marker for you
        this.directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
      }
      const directionsRenderer = this.directionsRenderer;

      if (this.showDirection && this.destination) {
        const directionsService = new google.maps.DirectionsService();
        directionsRenderer.setMap(map);
        directionsService.route({
          origin: { lat: this.origin.latitude, lng: this.origin.longitude },
          destination: { lat: this.destination.lat, lng: this.destination.lng },
          waypoints: [],
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
            // If you'll like to display an info window along the route
            // middleStep is used to estimate the midpoint on the route where the info window will appear
            // const middleStep = (response.routes[0].legs[0].steps.length / 2).toFixed();
            // const infowindow2 = new google.maps.InfoWindow();
            // infowindow2.setContent('');
            // infowindow2.setPosition(response.routes[0].legs[0].steps[middleStep].end_location);
            // infowindow2.open(map);
          } else {
            console.log(`%c Directions request failed due to ${status}`, 'background: #444; padding: 2px; border-radius:2px; color: #ffc107');
          }
        });
      }

    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.destination || changes.showDirection || changes.origin) {
      // this checks if the show directions input changed, if so the directions are removed
      // else we redraw the directions
      if (changes.showDirection && !changes.showDirection.currentValue) {
        if (this.directionsRenderer !== undefined) { // check this value is not undefined
          this.directionsRenderer.setDirections({ routes: [] });
          return;
        }
      } else {
        if (this.origin && this.destination) {
          this.drawDirectionsRoute();
        }
      }
    }
  }

}
