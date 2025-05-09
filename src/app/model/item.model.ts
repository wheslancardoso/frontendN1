export interface Item {
  id?: number; // 'id' é opcional ao criar um novo item, pois será gerado pelo backend
  name: string;
  description?: string; // 'description' pode ser opcional, dependendo da sua regra de negócio
}