import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { productoI } from '../interfaces/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private api = 'https://mb8642ow37.execute-api.us-east-1.amazonaws.com/v1/post';


  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() : Observable<productoI[]>{
    const path = `${this.api}/getPostsResource.detail.allPosts`;
    return this.http.get<productoI[]>(path)
  }

  getProduct(idProducto: String, userId: String){
    const path = `${this.api}/getPostByProductResource/${idProducto}/${userId}`;
    return this.http.get(path);
  }

  createProduct(producto: productoI){
    const path = `${this.api}/createPostResource`;
    return this.http.post(path, producto);
  }

  updateProduct(userId: String,producto: productoI){
    const path = `${this.api}/updatePostResource/${producto.idProducto}`;
    return this.http.put<productoI>(path, producto);
  }

  deteleProduct(idProducto: String){
    const path = `${this.api}/deletePostResource/${idProducto}`;
    return this.http.delete(path);
  }


}
