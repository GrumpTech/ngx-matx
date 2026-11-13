import {
  provideNgDocApp,
  provideSearchEngine,
  NgDocDefaultSearchEngine,
  providePageSkeleton,
  NG_DOC_DEFAULT_PAGE_SKELETON,
  provideMainPageProcessor,
  NG_DOC_DEFAULT_PAGE_PROCESSORS,
  provideNgDocTexts,
} from '@ng-doc/app';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NG_DOC_ROUTING, provideNgDocContext } from '@ng-doc/generated';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      [...routes, ...NG_DOC_ROUTING],
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideNgDocContext(),
    provideNgDocApp(),
    provideNgDocTexts({
      searchPalette: {
        actionToggleTheme: '',
        actionToggleThemeKeywords: '',
      },
    }),
    provideSearchEngine(NgDocDefaultSearchEngine),
    providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
    provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS),
  ],
};
