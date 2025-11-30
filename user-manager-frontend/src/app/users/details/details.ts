// user-details.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatChipsModule,
    MatButtonModule
  ],
  templateUrl: './details.html',
  styleUrls: ['./details.scss']
})
export class UserDetailsComponent implements OnInit {

  user$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.user$ = this.userService.getById(id);
  }

  ageLabel(age?: number) {
    if (!age) return 'idade desconhecida';
    if (age < 30) return 'adulto jovem';
    if (age < 50) return 'adulto';
    return 'idade madura';
  }
}
