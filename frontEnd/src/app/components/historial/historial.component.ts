import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { OrdenTrabajo, OtServiceService } from '../../../service/ot-service.service';
import { UserService } from '../../../service/services/user.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistorialComponent implements OnInit {
  ots: any[] = [];
  edificios: string[] = [];
  pisos: string[] = [];
  ubicaciones: string[] = [];
  sectores:string[] = [];
  activos: string[] = [];
  operarios: string[] = [];

  selectedEdificio: string = '';
  selectedPiso: string = '';
  selectedUbicacion: string = '';
  selectedSector: string = '';
  selectedActivo: string = '';
  selectedOperario: string = '';
  datosTareas: any;
  selectedWorkOrderId: any;
  renderer: any;
  showPopup: boolean | undefined;
  http: any;
  

  constructor(private otService: OtServiceService, private userService : UserService) {}

  ngOnInit(): void {
    this.otService.getOT().subscribe((ots: any[]) => {
      console.log('Datos recibidos:', ots);
      this.ots = ots; // Store OT data for filtering
      this.extractUniqueValues(); // Get unique values for each select
      this.mostrarTablaFiltrada();
  
      const container = document.getElementById('tabla-container');
      if (!container) {
        console.error('El contenedor no existe en el HTML');
        return;
      }
  
      let tablaHTML = `
      <table class="tabla-ot">
        <thead>
          <tr>
            <th class="tabla-encabezado">Nº</th>
            <th class="tabla-encabezado">Edificio</th>
            <th class="tabla-encabezado">Piso</th>
            <th class="tabla-encabezado">Ubicación</th>
            <th class="tabla-encabezado">Sector</th>
            <th class="tabla-encabezado">Activo</th>
            <th class="tabla-encabezado">Operario</th>
            <th class="tabla-encabezado">Disponibilidad</th>
            <th class="tabla-encabezado">Tareas</th>
          </tr>
        </thead>
        <tbody>
      `;
  
      ots.forEach((orden) => {
        tablaHTML += `
          <tr *ngFor="let orden of ots" >
            <td class="tabla-edificio tablaTXT">${orden.id}</td>
            <td class="tabla-edificio tablaTXT">${orden.Edificio}</td>
            <td class="tabla-piso tablaTXT">${orden.Piso}</td>
            <td class="tabla-ubicacion tablaTXT">${orden.Ubicacion}</td>
            <td class="tabla-sector tablaTXT">${orden.Sector}</td>
            <td class="tabla-activo tablaTXT">${orden.Tipo_Activo}</td>
            <td class="tabla-operario tablaTXT">${orden.usuarios}</td>
            <td class="tabla-operario tablaTXT">${orden.disponible}</td>
            <td class="tabla-operario tablaTXT">${orden.Tareas}</td>
            <td class="tabla-operario tablaTXT tablaButon"> 
              <button class="delete-btn" (click)="promptDeleteOT(orden.id)" data-id="${orden.id}">🗑️</button>
              <button class="btnCambio" (click)="cambiarEstado(orden.id, !orden.disponible)">
              ✔
              </button>
             
            </td>
          </tr>
        `;
      });
  
      tablaHTML += `
        </tbody>
      </table>
      `;
  
      container.innerHTML = tablaHTML;
  
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          const id = (event.target as HTMLButtonElement).getAttribute('data-id');
          if (id) {
            this.promptdeleteOT(Number(id));
          }
        });
      });
    });
  }
 

  extractUniqueValues() {
    this.edificios = [...new Set(this.ots.map(ot => ot.Edificio))];
    this.pisos = [...new Set(this.ots.map(ot => ot.Piso))];
    this.ubicaciones = [...new Set(this.ots.map(ot => ot.Ubicacion))];
    this.sectores = [...new Set(this.ots.map(ot => ot.Sector))];
    this.activos = [...new Set(this.ots.map(ot => ot.Tipo_Activo))];
    this.operarios = [...new Set(this.ots.map(ot => ot.usuarios))]
  }

  mostrarTablaFiltrada() {
    const container = document.getElementById('tabla-container');
    if (!container) return;

    const datosFiltrados = this.ots.filter(ot =>
      (!this.selectedEdificio || ot.Edificio.includes(this.selectedEdificio)) &&
      (!this.selectedPiso || ot.Piso.includes(this.selectedPiso)) &&
      (!this.selectedUbicacion || ot.Ubicacion.includes(this.selectedUbicacion)) &&
      (!this.selectedSector || ot.Sector.includes(this.selectedSector)) &&
      (!this.selectedActivo || ot.Tipo_Activo.includes(this.selectedActivo)) &&
      (!this.selectedOperario || ot.usuarios.includes(this.selectedOperario))
  );
  

    let tablaHTML = `
      <table class="tabla-ot">
        <thead>
          <tr>
            <th class="tabla-encabezado">Nº</th>
            <th class="tabla-encabezado">Edificio</th>
            <th class="tabla-encabezado">Piso</th>
            <th class="tabla-encabezado">Ubicación</th>
            <th class="tabla-encabezado">Sector</th>
            <th class="tabla-encabezado">Activo</th>
            <th class="tabla-encabezado">Operario</th>
             <th class="tabla-encabezado">Tareas</th>
          </tr>
        </thead>
        <tbody>
    `;

    datosFiltrados.forEach(orden => {
      tablaHTML += `
        <tr *ngFor="let orden of ots">
          <td class="tabla-sector tablaTXT">${orden.id}</td>
          <td class="tabla-sector tablaTXT">${orden.Edificio}</td>
          <td class="tabla-sector tablaTXT">${orden.Piso}</td>
          <td class="tabla-sector tablaTXT">${orden.Ubicacion}</td>
          <td class="tabla-sector tablaTXT">${orden.Sector}</td>
          <td class="tabla-sector tablaTXT">${orden.Tipo_Activo}</td>
          <td class="tabla-sector tablaTXT">${orden.usuarios}</td>
          <td class="tabla-operario tablaTXT">${orden.Tareas}</td>
          <td class="tabla-operario tablaTXT tablaButon"> 
              <button class="delete-btn" 
              data-id="${orden.id}">🗑️</button>
              <button class="botonTilde">✔</button>
            </td>
        </tr>
      `;
    });

    tablaHTML += `</tbody></table>`;
    container.innerHTML = tablaHTML;
  }

  filtrarOTs() {
    this.mostrarTablaFiltrada();
  }

  promptdeleteOT(id: number) {
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const message = document.createElement('p');
    message.innerText = '¿Estás seguro de que deseas eliminar esta OT?';
    message.classList.add('modal-message');

    const confirmButton = document.createElement('button');
    confirmButton.innerText = 'Sí';
    confirmButton.classList.add('modal-confirm-button');
    confirmButton.onclick = () => {
      this.otService.deleteOT(id).subscribe(response => {
        console.log('OT eliminada:', response);
        document.body.removeChild(modal);
        window.location.reload();
      }, error => {
        console.error('Error al eliminar la OT:', error);
        document.body.removeChild(modal);
      });
    };

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'No';
    cancelButton.classList.add('modal-cancel-button');
    cancelButton.onclick = () => {
      document.body.removeChild(modal);
    };

    modalContent.appendChild(message);
    modalContent.appendChild(confirmButton);
    modalContent.appendChild(cancelButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }

  reiniciar(){
    window.location.reload();
  }


  cambiarEstado(id: number, estado: boolean): void {
   
    const nuevaOrden = this.ots.find(orden => orden.id === id);
    if (nuevaOrden) {
      nuevaOrden.estado = estado;  

      
      this.otService.updateEstadoOT(id, estado).subscribe(
        (response) => {
          console.log('Estado actualizado', response);
        },
        (error) => {
          console.error('Error al actualizar el estado', error);
         
          nuevaOrden.estado = !estado; 
        }
      );
    }
  }
  logout() {
    this.userService.logout();
    window.location.href = '/login';  
  }

}


