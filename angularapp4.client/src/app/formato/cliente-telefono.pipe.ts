import { Pipe, PipeTransform } from '@angular/core';
import { ClienteModel } from '../services/cliente.service';

@Pipe({
  name: 'formatoTelefono'
})
export class ClienteTelefonoPipe implements PipeTransform {

  transform(cliente: ClienteModel): string {
    if (!cliente || !cliente.telefono) {
      return '';
    }
  // Eliminar cualquier espacio en blanco antes de comenzar
  cliente.telefono = cliente.telefono.trim();

  // Separar los dígitos en grupos de 4 con espacios
  const formattedValue = cliente.telefono.replace(/\B(?=(\d{4})+(?!\d))/g, ' ');

  return formattedValue;

  }

}
