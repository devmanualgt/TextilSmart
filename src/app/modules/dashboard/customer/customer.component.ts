import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-customer',
  standalone: true,
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  saludo = ""

  ngOnInit(): void {
    console.log("Inicio del componenete")
    this.asignarsaludo()
  }
  
  asignarsaludo(){
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
}
