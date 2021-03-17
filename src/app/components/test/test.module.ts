import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceTestComponent } from './service-test/service-test.component';



@NgModule({
  declarations: [ServiceTestComponent],
  imports: [
    CommonModule
  ],
  exports: [ServiceTestComponent]
})
export class TestModule { }
