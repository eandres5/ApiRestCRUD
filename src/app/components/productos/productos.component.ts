import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../services/producto.service';
import { productoI } from '../../interfaces/producto';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any = [];
  filterPost = "";

  producto: productoI = {
    idProducto: '',
    userId: '',
    categoryId: 2,
    nombreProducto: '',
    statusProducto: 1,
    descripcion: '',
    precio: 0,
    product_cover_photo: '',
    allPhotos: [],
    date: new Date(),
  };

  productForm: FormGroup;

  constructor(
    private productoService: ProductoService,
    private router:Router
  ) { 
    this.productForm = this.createFormGroup();
  }

  ngOnInit(): void {

    this.getAllProducts();
  }

  getAllProducts() {
    this.productoService.getAllProducts().subscribe((prod: any ) => {
      console.log(prod);
      this.productos = prod['detail'].allPosts[0].productos;
      console.log(this.productos);    
    })
  }

  getProduct(idPro: string, idUser: String){
    console.log(idPro);
    console.log(idUser);
    this.productoService.getProduct(idPro,idUser).subscribe(producto => {
      console.log(producto);
    })
  }

  createProduct(){

    this.producto.idProducto = uuidv4();
    this.producto.userId = uuidv4();

    if(this.productForm.value){
      this.productoService.createProduct(this.producto).subscribe(data => {console.log(data)})
      this.resetForm();
    }else{
      console.log("vacio");
    }
    
  }

  updateProduct(){
    this.productoService.updateProduct(this.producto).subscribe(data => {console.log(data)}) 
  }

  deleteProduct(idPro: string) {
    console.log(idPro);
    this.productoService.deteleProduct(idPro).subscribe(data => {console.log(data)})
  }

  watchProduct(){
  
  }

  createFormGroup(){
    return new FormGroup({
      idProducto: new FormControl(''),
      userId: new FormControl(''),
      productoF: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      categoryId: new FormControl(''),
      statusProducto: new FormControl(''),
      allPhotos: new FormControl(''),
      date: new FormControl(''),
    })
  }

  resetForm(){
    this.productForm.reset();
  }

  get productoF() { return this.productForm.get('productoF');}
  get description() { return this.productForm.get('description');}
  get precio() { return this.productForm.get('precio');}
  get image() { return this.productForm.get('image');}
}
