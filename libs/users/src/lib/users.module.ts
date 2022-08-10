import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';

const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
    imports: [
      CommonModule, 
      RouterModule.forChild(ROUTES), 
      InputTextModule, 
      FormsModule, 
      ReactiveFormsModule, 
      ButtonModule],
    declarations: [ 
      LoginComponent
    ]
})

export class UsersModule {}