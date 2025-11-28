import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from '../../services/user.service';

import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

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
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('id');
    const id = raw ? parseInt(raw, 10) : NaN;
    if (!isNaN(id)) {
      this.userService.getById(id).subscribe(u => this.user = u);
    }
  }

  ageLabel(age?: number) {
    if (!age) return 'idade desconhecida';
    if (age < 30) return 'adulto jovem';
    if (age < 50) return 'adulto';
    return 'idade madura';
  }
}
