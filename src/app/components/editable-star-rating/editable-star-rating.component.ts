import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReviewData } from 'src/app/models/ReviewData';
import { FirebaseService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-editable-star-rating',
  templateUrl: './editable-star-rating.component.html',
  styleUrls: ['./editable-star-rating.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableStarRatingComponent implements OnInit, OnChanges {

  @Input() stars: number;
  @Input() editable: boolean;
  @Input() reviews: ReviewData[];
  @Output() setStarsEmitter = new EventEmitter();
  @Input() type: string;
  @Input() showNumberOfRatings: boolean = false;
  @Input() id: string;
  
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    if (this.reviews) {
      this.getStarsFromReview();
    }
     else if (this.id) {
       this.getStarsFromId();
     }
  }
  getStarsFromReview() {
    this.reviews = this.reviews.filter(item => item.comment)
    this.stars = this.reviews.reduce(function (acc: number, obj: ReviewData) { return +acc + +obj.stars }, 0) / this.reviews.length
  }

  getStarsFromId() {
    this.firebaseService.getReviewsData().subscribe(data => {
      this.reviews = [];
      data.forEach(review => {
        const reviewDetails = new ReviewData(review);
        if (this.type === 'university') {
          if (reviewDetails.universityId === this.id && reviewDetails.status !== 'declined') {
            this.reviews.push(reviewDetails);
          }
        } else if (this.type === 'faculty') {
          if (reviewDetails.facultyId === this.id && reviewDetails.status !== 'declined') {
            this.reviews.push(reviewDetails);
          }
        }
      });
      this.getStarsFromReview();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.reviews) {
      this.getStarsFromReview();
    } else if (changes.id) {
      this.getStarsFromId();
    } 
  }

  setStars(numberOfStars: number) {
    this.stars = numberOfStars
    this.setStarsEmitter.emit(numberOfStars);
  }

}
