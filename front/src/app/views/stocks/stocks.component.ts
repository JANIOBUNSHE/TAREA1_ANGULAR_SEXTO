import { Component } from '@angular/core';
import { IStock} from '../../Interfaces/istock';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { StocksService } from '../../Services/stocks.service';
@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css',
})
export class StocksComponent {
  title = 'Stock';
  stocks: IStock[];

  constructor(private stocksServicio: StocksService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.stocksServicio.todos().subscribe((listastocks) => {
      this.stocks = listastocks;
      console.log(listastocks);
    });
  }
  alerta() {
    Swal.fire('Stock', 'Mensaje en Stocks', 'success');
  }

  eliminar(StockId: number) {
    Swal.fire({
      title: 'Stock',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.stocksServicio.eliminar(StockId).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Stock',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'Stock',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
