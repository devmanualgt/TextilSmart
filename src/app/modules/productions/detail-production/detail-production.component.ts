import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-detail-production',
  templateUrl: './detail-production.component.html', // asegúrate de que coincida con el nombre del archivo
  styleUrls: ['./detail-production.component.scss']
})
export class DetailProductionComponent implements OnInit {  // Cambia el nombre de la clase aquí
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.showGeneralContent();

    const generalTab = document.getElementById('general-tab');
    const monitoreoTab = document.getElementById('monitoreo-tab');

    generalTab?.addEventListener('click', () => {
      this.showGeneralContent();
      generalTab.classList.add('active');
      monitoreoTab?.classList.remove('active');
    });

    monitoreoTab?.addEventListener('click', () => {
      this.showMonitoreoContent();
      monitoreoTab.classList.add('active');
      generalTab?.classList.remove('active');
    });
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
