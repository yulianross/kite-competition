import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { IonicModule } from 'ionic-angular';

// components
import { DisplayComponent } from './display/display';
import { FooterComponent } from './footer/footer';
import { NavbarPopoverComponent } from './navbar-popover/navbar-popover';
import { LineChartComponent } from './line-chart/line-chart';
import { MenuComponent } from './menu/menu';

// google maps
import { GoogleMapComponent } from './google-map/google-map';

// google maps
import { AgmCoreModule } from '@agm/core';

// pipes
import { TruncateModule } from 'ng2-truncate';

import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
        declarations: [
                NavbarComponent,
                DisplayComponent,
                FooterComponent,
                NavbarPopoverComponent,
                NavbarPopoverComponent,
                LineChartComponent,
                GoogleMapComponent,
                MenuComponent],

         imports: [
                IonicModule, 
                AgmCoreModule.forRoot({
                        apiKey: 'AIzaSyATjj5sEL6bUg-9eRkI2A_r2upscMaBHnA'
                }),
                TruncateModule,
                HighchartsChartModule
        ],
    
	exports: [
                NavbarComponent,
                DisplayComponent,
                FooterComponent,
                NavbarPopoverComponent,
                NavbarPopoverComponent,
                LineChartComponent,
                GoogleMapComponent,
                MenuComponent]
})

export class ComponentsModule {}
