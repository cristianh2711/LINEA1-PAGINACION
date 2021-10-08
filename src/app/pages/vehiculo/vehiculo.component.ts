import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { MatSort } from '@angular/material/sort';
=======
>>>>>>> a7d5171f6b51805290ff54a47afe352d56e57d82

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
<<<<<<< HEAD

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

=======

  @ViewChild("VehiculoPaginator") paginator: MatPaginator;

  displayedColumns: String[] = ['idVehiculo','placa','modelo','marca','tipoVehiculo','capacidad']
  dataSource = new MatTableDataSource<Vehiculo>();
  constructor(private vehiculoService: VehiculoService,
              public route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  

  ngOnInit(): void {

>>>>>>> a7d5171f6b51805290ff54a47afe352d56e57d82
    /*let vehiculo: Vehiculo = new Vehiculo();
    vehiculo.idVehiculo = 5;
    vehiculo.placa = "akm-147";
    vehiculo.modelo = "2019";
    vehiculo.marca = "Ford";
    vehiculo.tipoVehiuclo = "Carga";
    vehiculo.capacidad = "50Kg"; */
<<<<<<< HEAD


=======
    
    this.vehiculoService.listarV().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
>>>>>>> a7d5171f6b51805290ff54a47afe352d56e57d82

    /*this.vehiculoService.guardar(vehiculo).subscribe(data =>{
        console.log("Se registro vehiculo");
    });*/
<<<<<<< HEAD
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
=======
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
>>>>>>> a7d5171f6b51805290ff54a47afe352d56e57d82

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
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