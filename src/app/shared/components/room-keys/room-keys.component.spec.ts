/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RoomKeysComponent } from './room-keys.component';

describe('RoomKeysComponent', () => {
  let component: RoomKeysComponent;
  let fixture: ComponentFixture<RoomKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
