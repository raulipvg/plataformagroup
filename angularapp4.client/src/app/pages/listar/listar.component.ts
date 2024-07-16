import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteModel, ClienteService } from '../../services/cliente.service';
import { ClienteTelefonoPipe } from '../../formato/cliente-telefono.pipe';
import { TableModule } from 'primeng/table';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  standalone:true,
  styleUrl: './listar.component.css',
  imports: [ CommonModule, TableModule ],
  providers: [ClienteTelefonoPipe]
})
export class ListarComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private clienteService: ClienteService,
              private formatTelefonoPipe: ClienteTelefonoPipe) {}
  loading: boolean =false;
  products!: ClienteModel[];

  ngOnInit() {
    this.clienteService.getAll2().subscribe({
      next: (data: ClienteModel[]) => {  
        console.log(data);
        //this.products = data;
        this.products = data.map(cliente => ({
          ...cliente,
          telefono: this.formatTelefonoPipe.transform(cliente)
        }));
 
      },
      error: (error: any) => {
        console.log(error)
      }
  });
  }

 

}
