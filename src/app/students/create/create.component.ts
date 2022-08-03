import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    public studentsService: StudentsService,
    private router: Router,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
  }

  get f(){
    return this.myForm.controls;
  } 

  onSubmit(form: FormGroup) {
    this.studentsService.create(form.value).subscribe((res:any) => {
         console.log('Student created successfully!');
         this.router.navigateByUrl('students/index');
    })
  }

}
