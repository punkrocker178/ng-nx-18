/* eslint-disable @typescript-eslint/no-empty-function */
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRouting, RenderMode, ServerRoute } from '@angular/ssr';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LOCAL_STORAGE } from './tokens';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    {
      provide: LOCAL_STORAGE,
      useFactory: () => ({
        getItem: () => { },
        setItem: () => { },
        removeItem: () => { },
      }),
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
