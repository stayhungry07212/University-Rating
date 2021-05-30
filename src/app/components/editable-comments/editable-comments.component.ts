import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ReviewData } from 'src/app/models/ReviewData';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { UserData } from 'src/app/models/UserData';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AzureAiTextAnalysisService } from 'src/app/services/azure-ai-text-analysis.service';
import { TextAnalyticData } from 'src/app/models/TextAnalyticData';

@Component({
  selector: 'app-editable-comments',
  templateUrl: './editable-comments.component.html',
  styleUrls: ['./editable-comments.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditableCommentsComponent implements OnInit {
  @Input() review: ReviewData;
  userData: UserData;
  isUserSubscription: Subscription;
  @Input() editable: boolean;
  user: UserData;
  form: FormGroup;
  starsValue: number;
  commentText: string;
  negativeSentimentWarning: boolean;
  // editCommentCheck: boolean;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private azureService: AzureAiTextAnalysisService
  ) {}

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(
      (result) => {
        this.user = new UserData(result);
      }
    );
    // if (!this.review.comment) {
    //   this.editCommentCheck = true;
    // }
    this.getUserDetailById(this.review.userId);
    this.form = this.formBuilder.group({
      stars: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
    });
  }

  getUserDetailById(id: string) {
    this.firebaseService.getUserById(id).subscribe((details) => {
      this.userData = new UserData(details);
    });
  }

  // editComment() {
  //   this.editCommentCheck = true;
  //   this.commentText = this.review.comment;
  // }

  addComment() {
    this.review.comment = this.commentText;
    this.azureService.sentimentAnalysis(this.review.comment).then((res) => {
      const data = new TextAnalyticData(res[0]);
      if (data.sentiment !== 'negative') {
        this.review.status = 'approved';
      } else {
        this.review.status = 'pending';
        this.negativeSentimentWarning = true;
      }
      this.firebaseService.addComment(this.review);
    });
  }

  setStarsForEditableComment(event: number) {
    this.review.stars = event;
  }
}
