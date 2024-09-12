import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/ui/header/header.component';
import { SidebarComponent } from '../../shared/ui/sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { DashboardService } from '../../shared/services/dashboard.service';
import { map, Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { Statistics } from '../../core/interfaces/statistics.interface';
import { CardInfoComponent } from './card-info/card-info.component';
import { LanguegeServices } from '../../shared/services/translate.service';
import { TranslateModule } from '@ngx-translate/core';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    CardModule,
    FormsModule,
    DropdownModule,
    NgApexchartsModule,
    CommonModule,
    CardInfoComponent,
    TranslateModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  options: { name: string; key: string }[] = [
    { name: 'filter-cvartal.1', key: 'day' },
    { name: 'filter-cvartal.2', key: 'month' },
    { name: 'filter-cvartal.3', key: 'year' },
  ];
  selectedOption: { name: string; key: string } = { name: 'დღე', key: 'day' };
  statistics$!: Observable<Statistics>;
  dateOptions$!: Observable<any>;
  private dashboardService = inject(DashboardService);
  private langService = inject(LanguegeServices);
  constructor() {}
  ngOnInit() {
    this.getStatistics(this.selectedOption);
    this.onLangChangeStatus();
  }
  getStatistics(selectedOption: { name: string; key: string }) {
    this.statistics$ = this.dashboardService
      .getStatistics$(selectedOption)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  onLangChangeStatus() {
    this.dateOptions$ = this.langService
      .translateOptions(this.options, [
        'filter-cvartal.1',
        'filter-cvartal.2',
        'filter-cvartal.3',
      ])
      .pipe(map((res) => res));
  }
}
