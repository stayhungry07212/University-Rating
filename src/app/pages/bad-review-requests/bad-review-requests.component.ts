import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { ReviewData } from 'src/app/models/ReviewData';

@Component({
  selector: 'app-bad-review-requests',
  templateUrl: './bad-review-requests.component.html',
  styleUrls: ['./bad-review-requests.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BadReviewRequestsComponent implements OnInit {

  reviews: ReviewData[] = [];
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getReviewsData().subscribe(result => {
      result.forEach(element => {
        this.reviews.push(new ReviewData(element));
      });
    });
  }

  approve(item: any) {
    this.firebaseService.approveReview(item);
  }

  decline(item: any) {
    this.firebaseService.declineReview(item);
  }

  getData(type: string) {
    return this.reviews.filter(item => {
      return item.status === type;
    });
  }


}
