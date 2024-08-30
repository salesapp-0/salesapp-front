import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from "../../shared/ui/header/header.component";
import {SidebarComponent} from "../../shared/ui/sidebar/sidebar.component";
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent, NgApexchartsModule
} from "ng-apexcharts";
import {DashboardService} from "../../shared/services/dashboard.service";
import {map, Observable} from "rxjs";
import {CommonModule, NgIf} from "@angular/common";
import {Statistics} from "../../core/interfaces/statistics.interface";
import {CardProgressComponent} from "./card-progress/card-progress.component";
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
    CardProgressComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit{
  options: {name:string}[] = [
    { name: 'დღე',},
    { name: 'წელი' },
  ];
  selectedOption: {name:string} =   { name: 'დღე',};
  statistics$!:Observable<Statistics>
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<any> = {};
  // colors: ["#8280FF", "#00974F", "#F93C65"],
  private dashboardService = inject(DashboardService)
  constructor() {

  }
  ngOnInit() {
    this.initConfig()

   this.statistics$ =  this.dashboardService.getStatistics$().pipe(
      map((res) => {
        this.chartOptions['series'] = [
          res.activePercentage,
          res.passivePercentage,
          res.overduePercentage,
        ];
        return res
      })
    )
  }

  initConfig() {
    this.chartOptions = {
      series: [76, 67, 61],
      chart: {
        height: 390,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 390,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ["#8280FF", "#00974F", "#F93C65"],
      labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
      legend: {
        show: false,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName: string, opts: { seriesIndex: number; w: any }) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 300,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }
}
