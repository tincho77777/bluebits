import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../../libs/products/src/lib/services/categories.service';
import { Category } from 'libs/products/src/lib/models/category';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'bluebits-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  //Siempre declarar las variables globales antes del constructor
  form: FormGroup;
  isSubmitted: boolean = false;
  editmode = false;
  currentCategoryID: string;

  constructor( 
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService, 
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({  // por defecto es un array vacio
      name: ['', Validators.required], //la libreria Validators nos permite hacer la validacion required para que no se envie vacio el campo
      icon: ['', Validators.required],
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) { //aca tambien validamos que si esta vacio no se mande
      return;
    }

    const category: Category = {
      id: this.currentCategoryID,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value
    };

    if(this.editmode){
      this._updateCategory(category);
    }else{
      this._addCategory(category);
    }
  }

  //metodo para crear una categoria
  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({  //mensaje de categoria creada
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is created!`
      });
      timer(2000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    },
    () => {
      this.messageService.add({  //mensaje de error
        severity: 'error',
        summary: 'Error',
        detail: 'Category is not created!'
      });
    }
  );
}

  //metodo para editar categoria
  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({  //mensaje de categoria actualizada
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is updated!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({  //mensaje de error en la actualizacion
          severity: 'error',
          summary: 'Error',
          detail: `Category ${category.name} is not updated!`
        });
      }
    );
  }

  //metodo para comprobar el editMode
  private _checkEditMode(){
    this.route.params.subscribe( (params) => {
      if(params.id){
        this.editmode = true;
        this.currentCategoryID = params.id;
        this.categoriesService.getCategory(params.id).subscribe( category => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
        })
      }
    })
  }

  get categoryForm() {
    return this.form.controls
  }

  }
