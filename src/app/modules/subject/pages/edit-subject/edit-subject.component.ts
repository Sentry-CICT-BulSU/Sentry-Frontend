import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-edit-subject',
    templateUrl: './edit-subject.component.html',
})
export class EditSubjectComponent implements OnInit {

  constructor() { }

  onSubmit() {

    //add code here

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Subject edited successfully!',
          });
  }

    ngOnInit() {
  }

}
