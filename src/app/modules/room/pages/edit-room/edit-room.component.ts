import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-edit-room',
    templateUrl: './edit-room.component.html',
})
export class EditRoomComponent implements OnInit {
  constructor() { }

  onSubmit() {

    //add code here

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Room edited successfully!',
          });
  }

  ngOnInit() {
}
}
