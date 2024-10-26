import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ProductionService } from '../services/production.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [
    FormsModule,
    // otros módulos
  ],
  selector: 'app-detail-production',
  standalone: true,
  templateUrl: './detail-production.component.html', // asegúrate de que coincida con el nombre del archivo
  styleUrls: ['./detail-production.component.scss']
})
export class DetailProductionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  productionId!: string;
  productions: any; // Variable para almacenar los detalles del producto  
  constructor(private alertService: AlertService, private productionService: ProductionService) { }

  ngOnInit(): void {
    this.showGeneralContent();
    this.getProductionId(); // Obtiene el ID del producto desde la URL
    this.getProductionDetails(); // Carga los detalles del producto

    const generalTab = document.getElementById('general-tab');
    const monitoreoTab = document.getElementById('monitoreo-tab');

    
  }


  getProductionId() {
    this.route.paramMap.subscribe((params) => {
      this.productionId = params.get('id')!;
    });
  }

  // Llamar al servicio para obtener los detalles del producto
  async getProductionDetails() {
    if (this.productionId) {
      const productionResponse = await this.productionService.findById(this.productionId);
      console.log(productionResponse); // Verifica los datos de la API en la consola
      if (productionResponse && productionResponse.status) {
        this.productions = productionResponse.data;

        // Convertir las fechas al formato YYYY-MM-DD
      if (this.productions.fechaInicio) {
        this.productions.fechaInicio = this.formatDate(this.productions.fechaInicio);
      }
      if (this.productions.fechaFinEstimada) {
        this.productions.fechaFinEstimada = this.formatDate(this.productions.fechaFinEstimada);
      }
  
        // Parsear los atributos_json si existen
        if (this.productions.detelleAtributos) {
          this.productions.detelleAtributos = this.productions.detelleAtributos.map((attr: string) => JSON.parse(attr));
        }
      }
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);  // Añadir ceros si es necesario
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }






  showGeneralContent(): void {
    const generalContent = document.getElementById('generalContent') as HTMLElement;
    const monitoreoContent = document.getElementById('monitoreoContent') as HTMLElement;

    generalContent.style.display = 'block';
    monitoreoContent.style.display = 'none';
  }

  showMonitoreoContent(): void {
    const generalContent = document.getElementById('generalContent') as HTMLElement;
    const monitoreoContent = document.getElementById('monitoreoContent') as HTMLElement;

    generalContent.style.display = 'none';
    monitoreoContent.style.display = 'block';
  }

  async cancelProduction() {
    const alertDeleted = await this.alertService.alertSimple(
      'Confirmación de Cancelacion',
      '¿Está seguro de que desea cancelar la producción? Esta acción es irreversible y la producción no podrá ser recuperado.',
      'warning',
      'Sí, eliminar',
      'Cancelar',
      false
    );

    if (alertDeleted) {
      console.log('usar API para eliminar');
    }
  }
}
