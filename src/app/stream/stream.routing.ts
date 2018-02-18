import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { StartStreamComponent } from './start-stream/start-stream.component';
import { WatchStreamComponent } from './watch-stream/watch-stream.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent, data: { title: 'Overview' } },
  { path: 'start-streaming', component: StartStreamComponent, data: { title: 'Start Stream' } },
  { path: 'watch-stream', component: WatchStreamComponent, data: { title: 'Watch Stream' } },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
