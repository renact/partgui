import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { PreviewComponent } from './preview/preview.component'
import { StreamComponent } from 'app/stream/shared/stream';

import { routing } from './stream.routing';

@NgModule({
    declarations: [
        OverviewComponent,
        PreviewComponent,
        StreamComponent,
    ],
    imports: [ 
        routing,
    ]
})

export class StreamViewsModule {
    constructor() {
    }
  }