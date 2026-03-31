import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling({scrollPositionRestoration:'top'})),
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor, loadingInterceptor, errorsInterceptor])),
    provideToastr({positionClass: 'toast-top-center'}), provideAnimations(),
    importProvidersFrom(NgxSpinnerModule)
  ]
};
