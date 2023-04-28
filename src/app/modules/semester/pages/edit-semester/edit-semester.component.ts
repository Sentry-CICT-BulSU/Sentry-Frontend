import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-edit-semester',
    templateUrl: './edit-semester.component.html',
})
export class EditSemesterComponent implements OnInit {
  constructor() { }

  onSubmit() {

    //add code here

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Semester edited successfully!',
          });
  }

  ngOnInit() {
}
}
