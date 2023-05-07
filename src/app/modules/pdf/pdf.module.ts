import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfComponent } from './pdf.component';
import { PdfRoutingModule } from './pdf-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PdfComponent],

  imports: [
    CommonModule,
    PdfRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class PdfModule {}
