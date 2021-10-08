import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  pageIndex: number = 0;
  pageSize: number = 5;
  lengthPage: number;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: String[] = ['placa', 'modelo', 'marca', 'tipoVehiculo', 'capacidad', 'ver']
  dataSource = new MatTableDataSource<Vehiculo>();

  constructor(private vehiculoService: VehiculoService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute) { }



  ngOnInit(): void {

    this.listarVeh();

    /*let vehiculo: Vehiculo = new Vehiculo();
    vehiculo.idVehiculo = 5;
    vehiculo.placa = "akm-147";
    vehiculo.modelo = "2019";
    vehiculo.marca = "Ford";
    vehiculo.tipoVehiuclo = "Carga";
    vehiculo.capacidad = "50Kg"; */



    /*this.vehiculoService.guardar(vehiculo).subscribe(data =>{
        console.log("Se registro vehiculo");
    });*/
    /*
         this.vehiculoService.editar(vehiculo).subscribe(data =>{
            console.log("Vehiculo editado correctamente");
          }, err => {
            if(err.error.status == 500) {
              this.openSnackBar("Error inesperado, comuniquese con el administrador");
            } else{
              this.openSnackBar(err.error.message);
            }
            
          });
    */

  }


  cambiarPag(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log("Pagina: " + this.pageIndex);
    console.log("Size: " + this.pageSize);
    this.listarVeh();
  }

  listarVeh() {
    this.vehiculoService.listarV(this.pageIndex, this.pageSize).subscribe(data => {
      this.lengthPage = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;

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

}