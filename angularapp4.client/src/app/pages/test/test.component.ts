import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ClienteModel, ClienteService } from '../../services/cliente.service';
import { TableModule } from 'primeng/table';



import { ReactiveFormsModule } from '@angular/forms'
import { ClienteTelefonoPipe } from '../../formato/cliente-telefono.pipe';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  standalone:true,
  imports: [ ButtonModule, DropdownModule, FormsModule , ReactiveFormsModule,
    InputTextModule,FloatLabelModule, TableModule
    
  ],
  providers: [ClienteTelefonoPipe]
  
})
export class TestComponent implements OnInit {
  
  loading: boolean =false;

  products!: ClienteModel[];


  formulario: FormGroup = new FormGroup({});

  constructor(
              private clienteService: ClienteService,
              private formatTelefonoPipe: ClienteTelefonoPipe
  ) { }


  ngOnInit(): void {

    this.clienteService.getAll().subscribe({
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
