import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './slider/slider.component';

import {ButtonModule} from 'primeng/button';
import { UiGallaryComponent } from './components/ui-gallary/ui-gallary.component';
@NgModule({
  imports: [CommonModule,ButtonModule],
  declarations: [
    BannerComponent,
    SliderComponent,
    UiGallaryComponent
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    UiGallaryComponent
  ],
})
export class UiModule {}
