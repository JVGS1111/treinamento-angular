import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductModalComponent } from '../delete-product-modal/delete-product-modal.component'
@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})




export class ProductReadComponent implements OnInit {

  products: Product[] = []
  displayedColumns = ['id', 'name', 'price', 'action']
  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
      console.log(products);
    })


  }
  openDialog(id: number) {
    this.dialog.open(DeleteProductModalComponent, {
      data: {
        functionDeleteProduct: () => this.deleteProduct(id)
      }
    })


  }


  deleteProduct(id: number) {
    this.productService.delete(id!).subscribe(() => {
      this.productService.showMessage('Produto deletado');
      this.products = this.products.filter((item) => {
        return item.id != id;
      })
    })
  }

}
