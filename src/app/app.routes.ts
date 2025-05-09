import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component'; // 1. Importar o ItemFormComponent

export const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: ItemListComponent },
  // 2. Rota para criar um novo item
  { path: 'item/new', component: ItemFormComponent },
  // 3. Rota para editar um item existente (usa um parâmetro de rota 'id')
  { path: 'item/edit/:id', component: ItemFormComponent },
  // Poderíamos adicionar uma rota para 'item/view/:id' se quiséssemos uma visualização separada
];
