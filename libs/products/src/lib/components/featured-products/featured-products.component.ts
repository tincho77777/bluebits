import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  featuredProducts: Product[] = [];
  endSubs$ : Subject<any> = new Subject();

  constructor( private prodService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  ngOnDestroy(): void {
      // this.endSubs$.next();
      this.endSubs$.complete();
  }

  private _getFeaturedProducts(){
    this.prodService.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe( products => {
      this.featuredProducts = products;
    })      //el 4 es porque quiero mostrar 4 productos por linea en pantlla
  }

}
