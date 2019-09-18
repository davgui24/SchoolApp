import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   // { 
//   //   path: '**', 
//   //   pathMatch: 'full', 
//   //   redirectTo: 'register' 
//   // },
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'home/:id',
//     loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
//   },
//   {
//     path: 'login',
//     loadChildren: () => import('./login-register/login/login/login.module').then(m => m.LoginPageModule)
//   },
//   {
//     path: 'list',
//     loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
//   },
//   {
//     path: 'register',
//     loadChildren: () => import('./login-register/register/register/register.module').then(m => m.RegisterPageModule)
//   },
//   { path: 'login', loadChildren: './login-register/login/login/login.module#LoginPageModule' },
//   { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },


//   // { path: 'register', loadChildren: './login-register/register/register/register.module#RegisterPageModule' }

// ];

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    //  redirectTo: (new LocalstorageService().cargarUltimoLogueo().length == 0 || new LocalstorageService().cargarUltimoLogueo()[0] == undefined) ? "login" : "inicio",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: "./login-register/login/login/login.module#LoginPageModule"
  },
  // { 
  //   path: 'register-user', 
  //   loadChildren: './forms/register-user/register-user.module#RegisterUserPageModule',
  // },
  {
   path: "register",
   loadChildren: "./login-register/register/register/register.module#RegisterPageModule",
   },
  {
    path: "home/:idUser",
    loadChildren: "./pages/home/home.module#HomePageModule"
  },
  { path: 'menu', loadChildren: './components/menu/menu.module#MenuPageModule' },
  { path: 'menu', loadChildren: './components/menu/menu.module#MenuPageModule' },
  { path: 'list-admins', loadChildren: './pages/list-admins/list-admins.module#ListAdminsPageModule' },
  { path: 'register-school', loadChildren: './forms/register-school/register-school.module#RegisterSchoolPageModule' },
  { path: 'assign-admin-to-school/:idSchool', loadChildren: './forms/assign-admin-to-school/assign-admin-to-school.module#AssignAdminToSchoolPageModule' },  { path: 'register-subjects', loadChildren: './forms/register-subjects/register-subjects.module#RegisterSubjectsPageModule' },
  { path: 'register-course', loadChildren: './forms/register-course/register-course.module#RegisterCoursePageModule' },





  // { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  // { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
  // { path: 'habitaciones', loadChildren: './pages/habitaciones/habitaciones.module#HabitacionesPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
