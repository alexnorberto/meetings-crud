import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  public meetingForm: FormGroup;
  public idEdit: string;

  constructor(
    private service: MeetingService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string
  ) { 
    this.idEdit = data;
  }

  ngOnInit(): void {
    this.meetingForm = this.formBuilder.group({
      id : [null],
      meetingName : ['',Validators.required],
      meetingSubject : ['',Validators.required],
      meetingResponsible : ['',Validators.required],
      meetingDate : ['',Validators.required],
      meetingTime : ['',Validators.required],
    });

    if (this.idEdit != null){
      this.getById();
    }
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  saveMeeting(): void {
    if (this.meetingForm.value.id == null) {
      this.createMeeting();
    } else {
      this.updateMeeting();
    }
  }

  createMeeting(){
    this.service.insert(this.meetingForm.value).subscribe(
      result => {
        console.log('Meeting insert ',result)
      },
      error => {
        console.log('Error ', error)
      }
    );
    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }

  updateMeeting(){
    this.service.update(this.meetingForm.value).subscribe(
      result => {
        console.log('Meeting insert ',result)
      },
      error => {
        console.log('Error ', error)
      }
    );
    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }

  getById(){
    this.service.getById(this.idEdit).subscribe(
      result => {
        
        this.meetingForm = this.formBuilder.group({
          id : [result['id'],Validators.required],
          meetingName : [result['meetingName'],Validators.required],
          meetingSubject : [result['meetingSubject'],Validators.required],
          meetingResponsible : [result['meetingResponsible'],Validators.required],
          meetingDate : [result['meetingDate'],Validators.required],
          meetingTime : [result['meetingTime'],Validators.required],
        });

      },
      error => {
        console.log('Error ', error)
      }
    );

  }

}
