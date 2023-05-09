import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartsService } from 'src/app/core/services/charts.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from 'src/app/shared/models/chart-options';

@Component({
  selector: '[chart-card]',
  templateUrl: './chart-card.component.html',
})
export class ChartCardComponent implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions>;
  private subscription: Subscription = new Subscription();
  data = [0, 0, 0, 5, 4, 0, 2];
  data2 = [0, 0, 0, 3, 4, 8, 6];
  categories = [
    '6 days ago',
    '5 days ago',
    '4 days ago',
    '3 days ago',
    '2 days ago',
    'Yesterday',
    'Today',
  ];
  constructor(
    private themeService: ThemeService,
    private chartService: ChartsService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Present',
          data: this.data,
          color: '#7239ea',
        },
        {
          name: 'Absent',
          data: this.data2,
          color: '#D6BBFB',
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'area',
        height: 150,
        stacked: true,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.2,
          stops: [15, 120, 100],
        },
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
      },
      xaxis: {
        categories: this.categories,
        labels: {
          show: false,
        },
        crosshairs: {
          position: 'front',
          stroke: {
            color: '#7239ea',
            width: 1,
            dashArray: 4,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      //   tooltip: {
      //     theme: 'light',
      //     y: {
      //       formatter: function (val) {
      //         return val + '$';
      //       },
      //     },
      //   },
      colors: ['#7239ea', '#D6BBFB'], // set colors for each series
    };
  }

  ngOnInit(): void {
    /** Chand chart theme */
    this.initComponent();
    this.chartService.loadCharts$().subscribe({
      next: (resp: any) => {
        console.log('chart data: ', resp);
        this.chartOptions.series = [
          {
            name: 'Present',
            data: resp.presentees,
            color: '#7239ea',
          },
          {
            name: 'Absent',
            data: resp.absentees,
            color: '#D6BBFB',
          },
        ];
        console.log('apexcharts: ', resp);
      },
      error: (err) => console.log(err),
    });
  }

  initComponent() {
    const sub = this.themeService.themeChanged.subscribe((theme) => {
      this.chartOptions.tooltip = {
        theme: theme,
      };
    });
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
