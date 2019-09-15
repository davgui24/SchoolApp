import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { 
  //   path: '**', 
  //   pathMatch: 'full', 
  //   redirectTo: 'register' 
  // },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-register/login/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./login-register/register/register/register.module').then(m => m.RegisterPageModule)
  },
  { path: 'login', loadChildren: './login-register/login/login/login.module#LoginPageModule' },

  // { path: 'register', loadChildren: './login-register/register/register/register.module#RegisterPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
