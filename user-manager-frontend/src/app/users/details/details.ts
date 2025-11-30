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
    const raw = this.route.snapshot.paramMap.get('id');
    const id = raw ? parseInt(raw, 10) : NaN;
    
    if (!isNaN(id)) {
      this.user$ = this.userService.getById(id);
    }
  }

  ageLabel(age?: number) {
    if (!age) return 'idade desconhecida';
    if (age < 30) return 'adulto jovem';
    if (age < 50) return 'adulto';
    return 'idade madura';
  }
}