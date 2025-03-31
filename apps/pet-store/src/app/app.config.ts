import { ApplicationConfig, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LOCAL_STORAGE } from './tokens';
import { httpInterceptor } from './middleware/authentication-interceptor';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(
      withFetch(),
      withInterceptors([httpInterceptor])),
    provideAnimationsAsync(),
    {
      provide: LOCAL_STORAGE,
      useFactory: (platformId: object) => {
   	 if (isPlatformServer(platformId)) {
   	   return {}; // Return an empty object on the server
   	 }
   	 return localStorage; // Use the browser's localStorage
      },
      deps: [PLATFORM_ID],
    },
  ],
};
