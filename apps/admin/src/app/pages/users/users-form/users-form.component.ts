import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'libs/users/src/lib/services/users.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { User } from 'libs/users/src/lib/models/user';
import { timer } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'bluebits-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {

  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  users = [];
  currentUserID: string;
  countries = [];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
    this._getCountries();
  }

  private _initUserForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    })
  }

  //metodo para crear un usuario
  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({  //mensaje de usuario creada
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`
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
        detail: 'User is not created!'
      });
    }
  );
}

  //metodo para editar usuario
  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({  //mensaje de categoria actualizada
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is updated!`
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
          detail: `User ${user.name} is not updated!`
        });
      }
    );
  }

  //metodo para comprobar el editMode
  private _checkEditMode(){
    this.route.params.subscribe( (params) => {
      if(params.id){
        this.editmode = true;
        this.currentUserID = params.id;
        this.usersService.getUser(params.id).subscribe( user => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        })
      }
    })
  }

  //metodo de envio
  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }

    const user: User = {
      id: this.currentUserID,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
      password: this.userForm.password.value
    };

    if(this.editmode){
      this._updateUser(user);
    }else{
      this._addUser(user);
    }
  }

  //metodo de cancelar
  onCancel(){
    this.location.back();
  }

  //metodo para los paises
  private _getCountries(){
    this.countries = this.usersService.getCountries();
  }

  get userForm() {
    return this.form.controls
  }

}
