import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngIf
import { FormsModule } from '@angular/forms'; // Para [(ngModel)] e template-driven forms
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Para navegação e parâmetros de rota
import { Item } from '../../model/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Adicionamos CommonModule, FormsModule e RouterModule
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent implements OnInit {
  item: Item = { name: '', description: '' }; // Inicializa o item (id será undefined para novos itens)
  isEditMode = false;
  private itemId: number | null = null;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute // Para ler o ID da rota no modo de edição
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.itemId = +idParam; // O '+' converte a string para número
      if (this.itemId && !isNaN(this.itemId)) {
        this.itemService.getItemById(this.itemId).subscribe({
          next: (data) => {
            this.item = data;
          },
          error: (err) => {
            console.error('Erro ao buscar item:', err);
            // Adicionar tratamento de erro, como redirecionar ou mostrar mensagem
            this.router.navigate(['/items']);
          }
        });
      } else {
        console.error('ID do item inválido na rota.');
        this.router.navigate(['/items']); // Redireciona se o ID não for um número válido
      }
    }
  }

  saveItem(): void {
    if (this.isEditMode && this.itemId) {
      this.itemService.updateItem(this.itemId, this.item).subscribe({
        next: () => {
          console.log('Item atualizado com sucesso');
          this.router.navigate(['/items']);
        },
        error: (err) => {
          console.error('Erro ao atualizar item:', err);
          // Adicionar feedback para o usuário sobre o erro
        }
      });
    } else {
      this.itemService.createItem(this.item).subscribe({
        next: (newItem) => {
          console.log('Item criado com sucesso:', newItem);
          this.router.navigate(['/items']);
        },
        error: (err) => {
          console.error('Erro ao criar item:', err);
          // Adicionar feedback para o usuário sobre o erro
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/items']);
  }
}
