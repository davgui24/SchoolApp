import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: "./login-register/login/login/login.module#LoginPageModule"
  },
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
  { path: 'register-subjects', loadChildren: './forms/register-subjects/register-subjects.module#RegisterSubjectsPageModule' },
  { path: 'register-course', loadChildren: './forms/register-course/register-course.module#RegisterCoursePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
