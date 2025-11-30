// user-details.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatChipsModule, MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs'; // Importar Observable

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatChipsModule,
    MatChipListbox,
    MatChipOption,
    MatButtonModule
  ],
  templateUrl: './details.html',
  styleUrls: ['./details.scss']
})
export class UserDetailsComponent implements OnInit {
  
  user$: Observable<any> | undefined; 

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    // 💡 CORREÇÃO: Pega o ID da rota diretamente como string.
    // Mongoose IDs são strings, não números.
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      // Chama o serviço com o ID como string
      this.user$ = this.userService.getById(id);
    }
    // Se 'id' for null/vazio (ex: na rota /users/details sem ID), user$ fica undefined.
    // O erro "NaN" não será mais gerado.
  }

  ageLabel(age?: number) {
    if (!age) return 'idade desconhecida';
    if (age < 30) return 'adulto jovem';
    if (age < 50) return 'adulto';
    return 'idade madura';
  }
}