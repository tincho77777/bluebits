import { Component, OnInit } from '@angular/core';
// import { ProductsService } from '../../../../../../../libs/products/src/lib/services/products.service';
import { ProductsService } from '@bluebits/products';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts(){
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }

  updateProduct( productid: string ){  //nos lleva a agregar una nueva categoria pero con el id de la categoria que seleccionamos actualizar
    this.router.navigateByUrl(`products/form/${productid}`)
  }

//metodo para eliminar productos
  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          }
        );
      }
    });
  }


}


