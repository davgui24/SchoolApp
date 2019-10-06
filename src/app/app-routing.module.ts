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
  { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
  { path: "register", loadChildren: "./login-register/register/register/register.module#RegisterPageModule" },
  { path: "register/:role", loadChildren: "./login-register/register/register/register.module#RegisterPageModule" },
  { path: 'register-school', loadChildren: './forms/register-school/register-school.module#RegisterSchoolPageModule' },
  { path: 'register-subjects', loadChildren: './forms/register-subjects/register-subjects.module#RegisterSubjectsPageModule' },
  { path: 'register-course', loadChildren: './forms/register-course/register-course.module#RegisterCoursePageModule' },
  { path: 'list-user', loadChildren: './pages/list-user/list-user.module#ListUserPageModule' },
  { path: 'list-admin', loadChildren: './pages/list-admin/list-admin.module#ListAdminPageModule' },
  { path: 'list-course', loadChildren: './pages/list-course/list-course.module#ListCoursePageModule' },
  { path: 'list-teacher', loadChildren: './pages/list-teacher/list-teacher.module#ListTeacherPageModule' },  { path: 'register-group', loadChildren: './forms/register-group/register-group.module#RegisterGroupPageModule' },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
