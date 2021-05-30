
import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';
import { } from 'googlemaps';

@Component({
    selector: 'AutocompleteAddressComponent',
    templateUrl: './google-places.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AutocompleteAddressComponent implements OnInit, AfterViewInit {
    @Input() adressType: string;
    @Input() disabled: boolean;
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext', { static: false }) addresstext: any;

    autocompleteInput: string;
    queryWait: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'RO' },
                types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
        });
    }

    invokeEvent(place: object) {
        this.setAddress.emit(place);
    }

}
