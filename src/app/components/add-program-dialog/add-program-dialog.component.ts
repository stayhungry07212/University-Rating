import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-program-dialog',
  templateUrl: './add-program-dialog.component.html',
  styleUrls: ['./add-program-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProgramDialogComponent implements OnInit {
  form: FormGroup;
  programType: string;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddProgramDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { 
      this.programType = data;
    }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ])
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }
}
