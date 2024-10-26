import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-dashboard-customer',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  @Input() user: any;
  saludo = '';
  stats: any;
  activities: any;
  stats2: any;

  // card 8
  giftcards: any[] = [
    {
      id: 1,
      imgSrc: './assets/dashboard/ver-pedidos.png',
      username: 'Tus cosas tal como las quieres...',
      textoboton: 'Ver Pedidos',
      ruta: 'sales/orders/list',
    },
    {
      id: 2,
      imgSrc: './assets/dashboard/producto3.png',
      username: '¡Lo mejor de lo mejor!',
      textoboton: 'Ver Productos',
      ruta: 'products/list',
    },
    {
      id: 3,
      imgSrc: './assets/dashboard/rastrear-pedidos.png',
      username: '¿Dónde está tu pedido?',
      textoboton: 'Rastrear Pedido',
      ruta: 'sales/orders/tracking',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Inicio del componenete');
    this.asignarsaludo();
  }

  asignarsaludo() {
    // Mensaje de bienvenida según la hora
    const hora = new Date().getHours();

    if (hora >= 6 && hora < 12) {
      this.saludo = 'Buen día, ';
    } else if (hora >= 12 && hora < 18) {
      this.saludo = 'Buena tarde';
    } else {
      this.saludo = 'Buena noche, ';
    }
  }

  redirigir(ruta: string) {
    this.router.navigate([ruta]);
  }
}
