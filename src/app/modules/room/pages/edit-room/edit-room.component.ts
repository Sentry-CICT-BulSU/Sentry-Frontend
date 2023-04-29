import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRoom } from 'src/app/core/models';
import { RoomService } from 'src/app/core/services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
})
export class EditRoomComponent implements OnInit {
  editRoomForm?: FormGroup;
  roomId?: number;
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    //add code here
    if (!this.editRoomForm) return;
    if (!this.roomId) return;
    if (this.editRoomForm.controls['name'].pristine)
      this.editRoomForm.removeControl('name');
    console.log(this.editRoomForm.value);
    this.roomService
      .updateRoom$(this.roomId, this.editRoomForm.value)
      .subscribe({
        next: (room) => {
          console.log(room);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Room edited successfully!',
            showConfirmButton: true,
          }).then(() => {
            this.router.navigate(['/room']);
          });
        },
        error: (err) => console.debug(err),
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id'] && !isNaN(+params['id'])) {
        this.roomId = +params['id'];
        this.roomService.loadRoom$(+params['id']).subscribe({
          next: (room) => {
            this.initForm(room.data as IRoom);
          },
          error: (err) => {
            console.debug(err);
          },
        });
      }
    });
  }

  initForm(room: IRoom) {
    this.editRoomForm = this.fb.group({
      name: [room.name],
      location: [room.location],
      status: [room.status],
    });
  }
}
