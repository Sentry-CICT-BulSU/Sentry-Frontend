import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from './../../../../core/services/room.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-room',
    templateUrl: './add-room.component.html',
})
export class AddRoomComponent implements OnInit {
    newRoomForm?: FormGroup;
    constructor(
        private roomService: RoomService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.newRoomForm = this.fb.group({
            name: ['', [Validators.required]],
            location: ['', [Validators.required]],
            status: ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.roomService.addRoom$(this.newRoomForm?.value).subscribe({
            next: (room) => {
                console.log(room);
                this.router.navigate(['/room']);
            },
            error: (err) => console.debug(err),
        });
    }
}
