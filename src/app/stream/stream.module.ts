import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';

import { routing } from './stream.routing';

NgModule({
    declarations: [
        OverviewComponent,
    ],
    imports: [ 
        routing,
    ]
})

export class StreamViewsModule {
    constructor() {
    }
  }