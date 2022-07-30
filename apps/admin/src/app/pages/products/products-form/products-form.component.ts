import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'libs/products/src/lib/models/product';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { CategoriesService } from '../../../../../../../libs/products/src/lib/services/categories.service';
import { ProductsService } from '../../../../../../../libs/products/src/lib/services/products.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  categories = [];
  imageDisplay: string | ArrayBuffer;
  currentProductID: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    })
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe( (categories) => {
      this.categories = categories;
    })
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value); //Append() Este método nos permite agregar nuevos elementos a una lista
    });

    if(this.editmode){
      this._updateProduct(productFormData);
    }else{
      this._addProduct(productFormData);
    }
  }

  onCancel(){
    this.location.back();
  }

  onImageUpload(event){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  //metodo para crear producto
  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({  //mensaje de proucto creada
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`
      });
      timer(1000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    },
    () => {
      this.messageService.add({  //mensaje de error
        severity: 'error',
        summary: 'Error',
        detail: 'Product is not created!'
      });
    }
  );
}

//metodo para editar categoria
private _updateProduct(productFormData: FormData) {
  this.productsService.updateProduct(productFormData, this.currentProductID).subscribe(
    () => {
      this.messageService.add({  //mensaje de producto actualizado
        severity: 'success',
        summary: 'Success',
        detail: `Product is updated!`
      });
      timer(1000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    },
    () => {
      this.messageService.add({  //mensaje de error en la actualizacion
        severity: 'error',
        summary: 'Error',
        detail: `Product is not updated!`
      });
    }
  );
}

//metodo para comprobar el editMode
private _checkEditMode(){
  this.route.params.subscribe( (params) => {
    if(params.id){
      this.editmode = true;
      this.currentProductID = params.id;
      this.productsService.getProduct(params.id).subscribe( (product) => {
        this.productForm.name.setValue(product.name);
        this.productForm.category.setValue(product.category.id);
        this.productForm.brand.setValue(product.brand);
        this.productForm.price.setValue(product.price);
        this.productForm.countInStock.setValue(product.countInStock);
        this.productForm.isFeatured.setValue(product.isFeatured);
        this.productForm.description.setValue(product.description);
        this.productForm.richDescription.setValue(product.richDescription);
        this.imageDisplay = product.image;
        this.productForm.image.setValidators([]);
        this.productForm.image.updateValueAndValidity();
      })
    }
  })
}   

  get productForm(){
    return this.form.controls;
  }

}
