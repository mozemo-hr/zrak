import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestModule } from './components/test/test.module';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';
import { DevicesPanelComponent } from './components/devices-panel/devices-panel.component';
import { InicijativaComponent } from './components/inicijativa/inicijativa.component';
import { ZagadjenostComponent } from './components/zagadjenost/zagadjenost.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LebdeceCesticeComponent } from './components/lebdece-cestice/lebdece-cestice.component';
import { registerLocaleData } from '@angular/common';
import localeHr from '@angular/common/locales/hr';

registerLocaleData(localeHr);

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    DevicesPanelComponent,
    DeviceDetailsComponent,
    InicijativaComponent,
    ZagadjenostComponent,
    DashboardComponent,
    LebdeceCesticeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    TestModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'hr' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
