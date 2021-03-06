import { NgModule, ApplicationRef, NgZone, Inject } from '@angular/core';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { HttpModule } from '@angular/http';
import {
  NgRedux,
  DevToolsExtension,
  NgReduxModule
} from '@angular-redux/store';
import {
  MainBaseModule,
  IState,
  RootReducer,
  RootEpic,
  ReduxModule,
  StableService,
  APP_ENVIRONMENT,
  RestService
} from '@dcs/ngx-utils';

import Environment from './environment';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';

console.time('bootstrap angular');

export function provideEnvironment(): Environment {
  return new Environment();
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    HttpModule,
    AppModule,
    NgReduxModule,
    NgReduxRouterModule,
    ReduxModule
  ],
  providers: [
    RestService,
    StableService,
    { provide: APP_ENVIRONMENT, useFactory: provideEnvironment }
  ]
})
export class MainModule extends MainBaseModule {
  constructor(
    appRef: ApplicationRef,
    store: NgRedux<IState>,
    devTools: DevToolsExtension,
    zone: NgZone,
    rootReducer: RootReducer,
    rootEpic: RootEpic,
    ngReduxRouter: NgReduxRouter,
    stableService: StableService,
    @Inject(APP_ENVIRONMENT) environment: Environment
  ) {
    super(
      appRef,
      store,
      devTools,
      zone,
      rootReducer,
      rootEpic,
      ngReduxRouter,
      environment,
      stableService
    );
  }
}
