import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from '../students';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  students: Student[] = [];
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public studentsService: StudentsService) { }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.studentsService.getAll().subscribe((data: Student[])=>{
      this.students = data;
      console.log(this.students);
    })  
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(id:string){
    this.studentsService.delete(id).subscribe(res => {
         this.students = this.students.filter(item => item.student_id !== id);
         console.log('Student deleted successfully!');
    })
  }

}
