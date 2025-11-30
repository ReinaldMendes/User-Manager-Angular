export type Permission = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string | null;
  name: string;
  email: string;
  password?: string;
  age?: number | null;
  status?: string;
  permissions?: string[];
}

