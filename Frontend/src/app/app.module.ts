import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Helpers
import { APP_LOCALE_ID } from '@helpers/locale';
import { registerLocale } from '@helpers/locale';

// Components
import { RootComponent } from '@components/root/root.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { HomeComponent } from '@components/home/home.component';
import { VideoCreateComponent } from '@components/video/video-create/video-create.component';
import { VideoListComponent } from '@components/video/video-list/video-list.component';

// Services
import { ConfigurationService } from '@services/configuration.service';
import { initConfig } from '@services/configuration.service';
import { VideoService } from '@services/video.service';

// Modules
import { AppRoutingModule } from '@app/app-routing.module';
import { AppMaterialModule } from '@app/app-material.module';

registerLocale();

@NgModule({
  declarations: [
    RootComponent,
    NavbarComponent,
    HomeComponent,
    VideoCreateComponent,
    VideoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigurationService],
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: APP_LOCALE_ID },
    { provide: LOCALE_ID, useValue: APP_LOCALE_ID },
    VideoService
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
