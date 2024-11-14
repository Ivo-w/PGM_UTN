import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AppModule } from '../../app.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OtServiceService } from '../../../service/ot-service.service';
import { UserService } from '../../../service/services/user.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrl: './orden-trabajo.component.css'
})

export class OrdenTrabajoComponent {
  selectedFecha: string = '';
  selectedEdificio: string = '';
  selectedSector: string = '';
  selectedPiso: string = '';
  selectedTipoActivo: string = '';
  selectedUbicacion: string = '';
  selectedUsuario: string = '';
  selectedTareas: string = '';
  pdfUrl: string = ''; 
  notificationMessage: string = '';
  notificationType: string = '';
  showNotification: boolean = false;


  datosPiso: any[] = [];
  datosEdificio: any[] = [];
  datosUsuario: any[] = [];
  datosActivo: any[] = [];
  datosUbicacion: any[] = [];
  datosSector: any[] = [];
  datosTareas: any[] = [];

  constructor(private apiService: OtServiceService, private userService : UserService) {}
 
  private showTempNotification(message: string, type: 'success' | 'error' | 'info') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 1000);
  }
  logout() {
    this.userService.logout();
    window.location.href = '/login';  
  }

  ngOnInit(): void {
    this.dataPiso()
    this.dataEdificio()
    this.dataUsuario()
    this.dataActivo()
    this.dataUbicacion()
    this.dataSector()
    this.dataTareas()
  }

  dataPiso(){
    this.apiService.getPiso('').subscribe(data => {
      this.datosPiso = data;
      console.log(this.datosPiso)
    })
  }

  dataEdificio(){
    this.apiService.getEdificio('').subscribe(data => {
      this.datosEdificio = data;
      console.log(this.datosEdificio)
    })
  }

  dataSector(){
    this.apiService.getSector('').subscribe(data => {
      this.datosSector = data;
      console.log(this.datosSector)
    })
  }

  dataUsuario(){
    this.apiService.getUser('').subscribe(data => {
      this.datosUsuario = data;
      console.log(this.datosUsuario)
    })
  }
 
  dataActivo(){
    this.apiService.getAT('').subscribe(data => {
      this.datosActivo = data;
      console.log(this.datosActivo)
    })
  }

  dataUbicacion(){
    this.apiService.getUbicacion('').subscribe(data => {
      this.datosUbicacion = data;
      console.log(this.datosUbicacion)
    })
  }

  dataTareas(){
    this.apiService.getTarea('').subscribe(data => {
      this.datosTareas = data;
      console.log(this.datosTareas)
    })
  }

  validarYGuardar(): void {
    if (!this.selectedEdificio || !this.selectedPiso || !this.selectedUbicacion || 
        !this.selectedSector || !this.selectedTipoActivo || !this.selectedUsuario || 
        !this.selectedTareas) {
          this.showTempNotification('Rellenar todos los datos.', 'error');
    } else {
      this.guardarEnOT();
      this.showTempNotification('Orden de trabajo guardada.', 'success');
    }
  }
  
  mostrarModal(mensaje: string): void {
   
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
   
    const message = document.createElement('p');
    message.innerText = mensaje;
    message.classList.add('mensajeModal');
    
    
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.classList.add('modal-close-button');
    closeButton.onclick = () => {
      
      document.body.removeChild(modal);
    };
    
    
    modalContent.appendChild(message);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    
    
    document.body.appendChild(modal);
  }

  @ViewChild('fechaInput') fechaInput!: ElementRef; 

  ngAfterViewInit() {
    this.fechaInput.nativeElement.addEventListener('change', (event: Event) => {
      const inputValue = (event.target as HTMLInputElement).value;
      this.selectedFecha = inputValue;
      const fechaSeleccionada = document.getElementById('fechaSeleccionada');
      fechaSeleccionada!.innerText = "Fecha seleccionada: " + inputValue;
    });
  }
  
  guardarEnOT() {
    const datosSeleccionados = {
      edificio: this.selectedEdificio,
      sector: this.selectedSector,
      piso: this.selectedPiso,
      tipoActivo: this.selectedTipoActivo,
      ubicacion: this.selectedUbicacion,
      usuario: this.selectedUsuario,
      tareas: this.selectedTareas,
      fecha: this.selectedFecha
    };
  
    console.log("Datos a guardar:", datosSeleccionados);
  
    this.apiService.createOT(datosSeleccionados).subscribe({
      next: (response) => {
        console.log('Datos guardados en la tabla OT:', response);
      },
      error: (error) => {
        console.error('Error al guardar en la tabla OT:', error);
      },
      complete: () => {
        console.log('Operación completada');
        this.borradoForm();
      }
    });
  }
  
  borradoForm() {
    this.selectedEdificio = '';
    this.selectedSector = '';
    this.selectedPiso = '';
    this.selectedTipoActivo = '';
    this.selectedUbicacion = '';
    this.selectedUsuario = '';
    this.selectedTareas = '';
    this.pdfUrl = '';
  }

 imprimirPagina(){
      window.print()
  }; 
  
  generatePDF() {
    const DATA = document.getElementById('pdf-content'); 
    if (DATA) {
      html2canvas(DATA).then(canvas => {
        const imgData = canvas.toDataURL('/assets/pdf/otpdf.pdf'); 
        const pdf = new jsPDF('p', 'mm', 'a4'); 

        
        const imgWidth = 150; 
        const pageHeight = pdf.internal.pageSize.height; 
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight; 

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight; 
        }
         
        const pdfBase64 = pdf.output('datauristring');

        this.pdfUrl = pdfBase64;

        pdf.save('ordenDeTrabajo.pdf');
      });
    }
  }
}
