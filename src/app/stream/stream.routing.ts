import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { StreamComponent } from './shared/stream.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent, data: { title: 'Overview' } },
  { path: 'start-streaming', component: StreamComponent, data: { title: 'Start Stream' } },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
