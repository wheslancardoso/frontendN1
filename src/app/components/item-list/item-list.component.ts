import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf, etc.
import { RouterLink } from '@angular/router'; // Para links de navegação
import { Item } from '../../model/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterLink], // Importar CommonModule e RouterLink
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  private itemService = inject(ItemService); // Nova forma de injeção (ou use constructor)

  // Alternativa com construtor (mais tradicional):
  // constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        console.log('Itens carregados:', this.items);
      },
      error: (err) => {
        console.error('Erro ao carregar itens:', err);
        // Aqui você pode adicionar tratamento de erro mais robusto, como mostrar uma mensagem ao usuário
      }
    });
  }

  deleteItem(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID do item é undefined. Não é possível deletar.');
      return;
    }
    if (confirm('Tem certeza que deseja deletar este item?')) { // Confirmação básica
      this.itemService.deleteItem(id).subscribe({
        next: () => {
          console.log(`Item com ID ${id} deletado com sucesso.`);
          this.loadItems(); // Recarrega a lista após deletar
        },
        error: (err) => {
          console.error(`Erro ao deletar item com ID ${id}:`, err);
          // Adicionar tratamento de erro (ex: notificação para o usuário)
        }
      });
    }
  }
}
