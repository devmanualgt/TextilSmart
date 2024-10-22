import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { PurchaseOrderService } from '../services/purchase-order.service';

@Component({
  selector: 'app-detail-purchase-orders',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './detail-purchase-orders.component.html',
  styleUrl: './detail-purchase-orders.component.scss',
})
export class DetailPurchaseOrdersComponent implements OnInit {
  private route = inject(ActivatedRoute);
  orderId!: string;

  constructor(private purchaseOrderService: PurchaseOrderService) {}

  ngOnInit(): void {
    this.getDetailId();
    this.getDetailOrder();
  }

  async getDetailOrder() {
    const detail = await this.purchaseOrderService.findById(this.orderId);
    console.log(detail);
  }

  getDetailId() {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get('id')!;
    });
  }
}
