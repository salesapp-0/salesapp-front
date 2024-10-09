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
    hasDescription?: boolean;
    icons?: { edit: boolean; delete: boolean; read?: boolean };
    property?: any;
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
  $limit$ = signal(8);
  $description$ = signal('');
  private selectedTooltips: Map<string, boolean> = new Map();
  onPageChange(event: any): void {
    this.$page$.set(event.page + 1);
    this.$limit$.set(event.rows);
    this.page.emit({ page: event.page + 1, limit: event.rows });
  }
  handleShowProperty(rowIndex: number, property: string) {
    const item = this.data.data[rowIndex];
    if (item && item[property] !== undefined) {
      this.$description$.set(
        Array.isArray(item[property])
          ? item[property].join(' ')
          : item[property]
      );
      const tooltipKey = `${rowIndex}-${property}`;
      this.selectedTooltips.set(tooltipKey, true);
    }
  }

  handleCloseProperty(rowIndex: number, property: string) {
    this.$description$.set('');
    const tooltipKey = `${rowIndex}-${property}`;
    this.selectedTooltips.set(tooltipKey, false);
  }

  isTooltipVisible(rowIndex: number, property: string): boolean {
    const tooltipKey = `${rowIndex}-${property}`;
    return this.selectedTooltips.get(tooltipKey) || false;
  }
}
