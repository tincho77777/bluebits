import { NgModule, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { CategoriesService } from '../../../../libs/products/src/lib/services/categories.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//imports de los iconos interactivos
import { defineLordIconElement } from 'lord-icon-element';
import  lottie  from 'lottie-web';

//ux de ngprime
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';





const UX_MODULE = [  //modulo de visuales, ponemos todos aca y reemplazamos en imports
    CardModule, 
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
]

const routes: Routes = [
    { path: '', 
    component: ShellComponent, 
    children: [
        { path: 'dashboard', component: DashboardComponent},
        { path: 'categories', component: CategoriesListComponent},
        { path: 'categories/form', component: CategoriesFormComponent},
        { path: 'categories/form/:id', component: CategoriesFormComponent}
    ] }
];

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent, 
        ShellComponent, 
        SidebarComponent, 
        CategoriesListComponent, 
        CategoriesFormComponent, ProductsListComponent],
    imports: [
        BrowserModule, 
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }), 
        ...UX_MODULE,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
    ],
providers: [CategoriesService, MessageService, ConfirmDialogModule, ConfirmationService ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
    constructor() {
        defineLordIconElement(lottie.loadAnimation);
}
}
