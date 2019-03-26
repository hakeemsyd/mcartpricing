import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { ThanksComponent } from './pages/thanks/thanks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'marketplace',
    pathMatch: 'full'
  },
  {
    path: 'marketplace',
    component: MarketplaceComponent
  },
  {
    path: 'thanks',
    component: ThanksComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }