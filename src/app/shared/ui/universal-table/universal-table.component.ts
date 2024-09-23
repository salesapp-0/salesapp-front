import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { CrudEnum } from '../../../core/enums/crud.enum';

@Component({
  selector: 'app-universal-table',
  standalone: true,
  imports: [TableModule, CommonModule, PaginatorModule],
  templateUrl: './universal-table.component.html',
  styleUrl: './universal-table.component.scss',
})
export class UniversalTableComponent {
  @Input() columns!: {
    field: string;
    title: string;
    width?: string;
    icons?: { edit: boolean; delete: boolean };
  }[];

  @Input() data!: any;

  @Input() rows: number = 10;
  @Input() totalRecords: number = 0;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Input() tabType = '';
  @Input() hasIcon: boolean = false;
  @Output() actionType = new EventEmitter();
  @Output() page = new EventEmitter();
  crudEnum = CrudEnum;
  $page$ = signal(1);
  $limit$ = signal(10);

  onPageChange(event: any): void {
    this.$page$.set(event.page + 1);
    this.$limit$.set(event.rows);
    this.page.emit({ page: event.page + 1, limit: event.rows });
  }
}
