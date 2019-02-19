import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { IonicModule } from 'ionic-angular';

// components
import { DisplayComponent } from './display/display';
import { FooterComponent } from './footer/footer';
import { NavbarPopoverComponent } from './navbar-popover/navbar-popover';
import { LineChartComponent } from './line-chart/line-chart';
import { MenuComponent } from './menu/menu';

// charts
import { ChartsModule } from 'ng2-charts';
import { GoogleMapComponent } from './google-map/google-map';

// google maps
import { AgmCoreModule } from '@agm/core';

// pipes
import { TruncateModule } from 'ng2-truncate';

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
                ChartsModule,
                AgmCoreModule.forRoot({
                        apiKey: 'AIzaSyATjj5sEL6bUg-9eRkI2A_r2upscMaBHnA'
                }),
                TruncateModule
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
