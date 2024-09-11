import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) }
];

@NgModule({
  declarations: [AppComponent,DetailComponent],
 // entryComponents: [DetailComponent],
  imports: [BrowserModule, IonicModule.forRoot(), 
  AppRoutingModule,HttpClientModule,
  RouterModule.forRoot(routes),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
