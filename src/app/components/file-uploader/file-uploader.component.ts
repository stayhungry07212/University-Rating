import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input() type: string;
  @Input() id: string;

  constructor(private afStorage: AngularFireStorage) { }

  upload(event) {
    switch (this.type) {
      case 'gallery': {
        const uploadTask = this.afStorage.ref(`/universityPhotos/${this.id}`).put(event.target.files[0]);
      }
        break;
      case 'user': {
        const uploadTask = this.afStorage.ref(`/users/${this.id}`).put(event.target.files[0]);
      }
        break;
      case 'logoUniversity': {
        const uploadTask = this.afStorage.ref(`/logoUniversity/${this.id}`).put(event.target.files[0]);
        uploadTask.then(snapshot => {
          firebase.storage().ref(snapshot.metadata.fullPath).getDownloadURL().then(url => {
            firebase.firestore().collection('University/').doc(this.id).update({
              logoUniversity: url
            });
          }).catch(error => {
            console.log('%c error on loading image', 'color: #dc3545;');
          });
        });
      }
        break;
      case 'logoFaculty': {
        const uploadTask = this.afStorage.ref(`/logoFaculty/${this.id}`).put(event.target.files[0]);
        uploadTask.then(snapshot => {
          firebase.storage().ref(snapshot.metadata.fullPath).getDownloadURL().then(url => {
            firebase.firestore().collection('Faculties/').doc(this.id).update({
              logoFaculty: url
            });
          }).catch(error => {
            console.log('%c error on loading image', 'color: #dc3545;');
          });
        });
      }
        break;
    }

  }

  ngOnInit() {
  }

}
