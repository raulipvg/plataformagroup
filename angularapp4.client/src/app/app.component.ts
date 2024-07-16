import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
//import { ButtonModule } from 'primeng/button';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  

})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}
  loading: boolean =false;
  ngOnInit() {
  }



  title = 'angularapp4.client';

  Action(){
    this.loading = true;
    console.log('La terrible accion cambia 2')
    setTimeout( () => { this.loading = false }, 300);
  }

  Action2(){
    //this.loading = false;
    console.log('cambio en caliente 2222')
  }
}
