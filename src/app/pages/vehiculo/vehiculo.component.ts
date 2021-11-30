import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AsociacionConductorComponent } from './asociacion-conductor/asociacion-conductor.component';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  pageIndex: number = 0;
  pageSize: number = 5;
  lengthPage: number;

  suscripcion: Subscription;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: String[] = ['placa', 'modelo', 'marca', 'tipoVehiculo', 'capacidad', 'ver']
  dataSource = new MatTableDataSource<Vehiculo>();

  constructor(private vehiculoService: VehiculoService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private barraProgresoService: BarraDeProgresoService,
    private dialog: MatDialog) { }



  async ngOnInit(): Promise<void> {

    this.listarVeh();
    this.suscripcion = this.vehiculoService.refresh.subscribe(() => {
      this.listarVeh();
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }


  cambiarPag(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log("Pagina: " + this.pageIndex);
    console.log("Size: " + this.pageSize);
    this.listarVeh();
  }

  listarVeh() {
    this.barraProgresoService.progressBarReactiva.next(false);
    this.vehiculoService.listarV(this.pageIndex, this.pageSize).subscribe(data => {
      this.lengthPage = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.barraProgresoService.progressBarReactiva.next(true);

    });
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialogo(vehiculo: Vehiculo) {
    const dialogRef = this.dialog.open(AsociacionConductorComponent, {
      width: '450px',
      height: '450px',
      data: { placa: vehiculo.placa, idVehiculo: vehiculo.idVehiculo }
    });
  }

}