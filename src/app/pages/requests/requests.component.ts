import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { RequestData } from 'src/app/models/RequestData';
import { ReviewResponseComponent } from 'src/app/components/review-response/review-response.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequestsComponent implements OnInit {

  requests: RequestData[] = [];
  constructor(private firebaseService: FirebaseService, private dialog: MatDialog) { }

  ngOnInit() {
    this.firebaseService.getRequestsData().subscribe(result => {
      result.forEach(element => {
        this.requests.push(new RequestData(element));
      });
    });
  }

  approve(item: any) {
    this.firebaseService.approveRequest(item);
  }

  decline(item: any) {
    const dialogRef = this.dialog.open(ReviewResponseComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel') {
        this.firebaseService.declineRequest(item, result);
      }
    });
  }

  getData(type: string) {
    return this.requests.filter(item => {
      return item.status === type;
    });
  }

}
