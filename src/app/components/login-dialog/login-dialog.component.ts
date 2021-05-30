import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginDialogComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  error: string;
  matcher = new MyErrorStateMatcher();

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>, private authService: AuthService) { }

  ngOnInit() {
  }

  signInWithEmail() {
    this.error = '';
    this.authService.signInRegular(this.emailFormControl.value, this.passwordFormControl.value)
      .then((res) => {
        this.dialogRef.close(res);
      })
      .catch((err) => this.error = err);
  }

  cancelLogin(): void {
    this.dialogRef.close();
  }

}
