import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { PreviewComponent } from './preview/preview.component'
import { StreamComponent } from './shared/stream.component';
import { JanusModule } from './janus/janus.module';
import { GrpcModule } from './grpc/grpc.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';

import { routing } from './stream.routing';
import { StartStreamComponent } from './start-stream/start-stream.component';
import { WatchStreamComponent } from './watch-stream/watch-stream.component';

@NgModule({
    declarations: [
        OverviewComponent,
        PreviewComponent,
        StreamComponent,
        StartStreamComponent,
        WatchStreamComponent
    ],
    imports: [ 
        CommonModule,
        routing,
        JanusModule,
        GrpcModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule
    ],
    exports: [
        StreamComponent,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class StreamViewsModule {
    constructor() {
    }
  }