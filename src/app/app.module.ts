import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';



import { CoreModule } from './core/core.module';
import { CoreUiModule } from './core-ui/core-ui.module';
import { ModalsModule } from './modals/modals.module';

import { MultiwalletModule, TestComponent } from './multiwallet/multiwallet.module';
// import { WalletViewsModule } from './wallet/wallet.module';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    /* own */
    CoreModule.forRoot(),
    CoreUiModule.forRoot(),
    ModalsModule.forRoot(),
    // WalletViewsModule, // shouldn't be needed?
    MultiwalletModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})

export class AppModule {
  constructor() {
  }
}
