import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
    { path: '', redirectTo: '/lists', pathMatch: 'full' },
    { path: 'new-list', component: NewListComponent },
    { path: 'login', component: LoginPageComponent }, 
    { path: 'signup', component: SignupPageComponent },    
    { path: 'lists', component: TasksComponent },
    { path: 'lists/:listId', component: TasksComponent },  
    { path: 'lists/:listId/new-task', component: NewTaskComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
