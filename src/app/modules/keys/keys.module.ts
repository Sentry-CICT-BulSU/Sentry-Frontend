import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysComponent } from './keys.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { KeysRoutingModule } from './keys-routing.module';

@NgModule({
  imports: [
    CommonModule,
    KeysRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
  ],
  declarations: [KeysComponent]
})
export class KeysModule { }
