import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: "",
    price: 0.00
  }

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {

  }

  createProduct(): void {
    if (this.product.name.length < 1 || this.product.price <= 0) {
      this.productService.showMessage('Dados invalidos', true);
      return
    }
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado');
      this.clearInputs();
    })

  }

  clearInputs() {
    this.product = {
      name: "",
      price: 0.00
    }
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
