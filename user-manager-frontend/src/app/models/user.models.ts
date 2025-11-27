export type Permission = 'admin' | 'editor' | 'viewer';

export interface User {
  id: number | null;         
  name: string;
  email: string;
  age: number | null;        
  status: string;
  permissions: string[];   
}
