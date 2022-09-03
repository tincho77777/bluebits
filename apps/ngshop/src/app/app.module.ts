import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsModule } from 'libs/products/src/lib/products.module';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '../../../../libs/ui/src/lib/ui.module'; //@bluebits/ui
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
    //constantes rutas para poder usar en app.component.html el <router-oulet>
    { path: '', component: HomePageComponent },
    { path: 'products', component: ProductListComponent }
];

@NgModule({
    declarations: [
        AppComponent, 
        NxWelcomeComponent, 
        HomePageComponent, 
        ProductListComponent, 
        HeaderComponent, 
        FooterComponent, 
        NavComponent],
    imports: [
        BrowserModule, 
        RouterModule.forRoot(routes), 
        UiModule, 
        AccordionModule, 
        BrowserAnimationsModule, 
        ProductsModule,
        HttpClientModule,
        ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
