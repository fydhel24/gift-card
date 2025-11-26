// resources/js/types/giftCard.ts

export interface Cliente {
  id: number;
  nombre: string;
  apellido_paterno: string;
  email?: string;
}

export interface User {
  id: number;
  name: string;
}

export interface GiftCard {
  id: number;
  codigo_unico: string;
  saldo_inicial: string; // Laravel devuelve como string con decimales
  saldo_actual: string;
  estado: 'activa' | 'inactiva';
  fecha_expiracion?: string; // YYYY-MM-DD
  tipo?: string;
  cliente?: Cliente | null;
  user?: User;
  created_at: string;
}

export interface PaginatedGiftCards {
  data: GiftCard[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: Array<{ url: string | null; label: string; active: boolean }>;
}