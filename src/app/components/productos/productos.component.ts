import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../services/producto.service';
import { productoI } from '../../interfaces/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos : productoI[];
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

  constructor(
    private productoService: ProductoService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.productoService.getAllProducts().subscribe( producto => {
        this.productos = producto;
      }
    );

    this.getAllProducts();
  }

  getAllProducts() {
    this.productoService.getAllProducts()
    .subscribe(
      producto => {
        console.log(producto);
      }
    );
  }

  getProduct(){
    this.productoService.getProduct(this.producto.idProducto,this.producto.userId).subscribe(producto => {
      console.log(producto);
    })
  }

  createProduct(){
    this.productoService.createProduct(this.producto).subscribe(data => {console.log(data)})
  }

  updateProduct(){
    this.productoService.updateProduct(this.producto.userId,this.producto).subscribe(data => {console.log(data)}) 
  }

  deleteProduct() {
    this.productoService.deteleProduct(this.producto.idProducto).subscribe(data => {console.log(data)})
  }

}
