import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../../libs/products/src/lib/services/categories.service';
import { Category } from 'libs/products/src/lib/models/category';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'bluebits-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor( 
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  deleteCategory( categoryId: string ) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.categoriesService.deleteCategory(categoryId).subscribe({
            next: () => this.messageService.add({ //mensaje de categoria eliminada
              severity: 'success', 
              summary: 'Success', 
              detail:'Category is deleted!'}
              ),
            error: () => this.messageService.add({  //mensaje de error
                severity:'error', 
                summary: 'Error', 
                detail:'Category is not deleted!'})
          })
      },
      reject: (type) => {
      } //si elijo el rejec no hago nada
  });
  }

  updateCategory( categoryId: string ){  //nos lleva a agregar una nueva categoria pero con el id de la categoria que seleccionamos actualizar
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe( cats => {
      this.categories = cats;
    })
  }

}
