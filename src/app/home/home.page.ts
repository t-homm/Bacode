import { Component } from '@angular/core';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products:Product[];
  scanedProduct:Product;

  constructor(private barcodeScanner: BarcodeScanner,) {
      this.products = [
          {id:1,name:'プラス　ニューウォーターLP28',barcode:'4549509679318'},
          {id:2,name:'LEGO STAR WARS Republic Gunshp & Clone Pilot',barcode:'5702015349123'},
          {id:3,name:'IHADA アレルスクリーンジェル EX ３ｇ',barcode:'4987415962726'},
      ]
  }

  scan(){
      this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      //検索
      var scanBarcode=barcodeData.text;
      var scanedProduct = this.products.filter(products => products.barcode == scanBarcode);

      this.scanedProduct = {
          id:scanedProduct[0].id,
          name:scanedProduct[0].name,
          barcode:scanedProduct[0].barcode
      }

      }).catch(err => {
          console.log('Error', err);
          this.scanedProduct = {
            id:999,
            name:'該当商品なし',
            barcode:''
          }
      });
  }
}

class Product{
  id:number;
  name:string;
  barcode:string;
}
