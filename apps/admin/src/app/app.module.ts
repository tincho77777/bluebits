//modules
import { NgModule, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersModule } from '../../../../libs/users/src/lib/users.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//services
import { CategoriesService } from '../../../../libs/products/src/lib/services/categories.service';
import { AuthGuard } from '../../../../libs/users/src/lib/services/auth-guard.service';
import { JwtInterceptor } from '../../../../libs/users/src/lib/services/jwt.interceptor';

//components
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';


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
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import {FieldsetModule} from 'primeng/fieldset';











const UX_MODULE = [  //modulo de visuales, ponemos todos aca y reemplazamos en imports
    CardModule, 
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    TagModule,
    InputMaskModule,
    FieldsetModule,
]

const routes: Routes = [
    { path: '', 
    component: ShellComponent, 
    canActivate: [AuthGuard], //esto proteje todas las rutas de que entre alguien que no este logueado
    children: [
        { path: 'dashboard', component: DashboardComponent},
        { path: 'categories', component: CategoriesListComponent},
        { path: 'categories/form', component: CategoriesFormComponent},
        { path: 'categories/form/:id', component: CategoriesFormComponent},
        { path: 'products', component: ProductsListComponent},
        { path: 'products/form', component: ProductsFormComponent},
        { path: 'products/form/:id', component: ProductsFormComponent},
        { path: 'users', component: UsersListComponent},
        { path: 'users/form', component: UsersFormComponent},
        { path: 'users/form/:id', component: UsersFormComponent},
        { path: 'orders', component: OrdersListComponent},
        { path: 'orders/:id', component: OrdersDetailComponent},
    ] }
];

@NgModule({
    declarations: [ //aca los componentes
        AppComponent,
        DashboardComponent, 
        ShellComponent, 
        SidebarComponent, 
        CategoriesListComponent, 
        CategoriesFormComponent,
        ProductsListComponent, 
        ProductsFormComponent, 
        UsersFormComponent, 
        UsersListComponent,
        OrdersListComponent, 
        OrdersDetailComponent],
    imports: [ //en los imports ser importan los modulos
        BrowserModule, 
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }), 
        ...UX_MODULE,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        UsersModule
    ],
providers: [CategoriesService, MessageService, ConfirmDialogModule, ConfirmationService,  //aca los servicios
{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ], 
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
    constructor() {
        defineLordIconElement(lottie.loadAnimation);
}
}
