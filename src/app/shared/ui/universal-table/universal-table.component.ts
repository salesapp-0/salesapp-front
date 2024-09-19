import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-universal-table',
  standalone: true,
  imports: [TableModule, CommonModule, PaginatorModule],
  templateUrl: './universal-table.component.html',
  styleUrl: './universal-table.component.scss',
})
export class UniversalTableComponent {
  @Input() header!: { title: string; hasIcon: boolean }[];
  @Input() hasIcon!: boolean;

  customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
  ];
}
