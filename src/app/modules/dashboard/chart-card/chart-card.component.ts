import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from 'src/app/shared/models/chart-options';

@Component({
  selector: '[chart-card]',
  templateUrl: './chart-card.component.html',
})
export class ChartCardComponent implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions>;
  private subscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {
    const data = [8, 4, 8, 5, 4, 0, 2];
    const data2 = [0, 4, 0, 3, 4, 8, 6];
    const categories = [
        "Day 1",
        "Day 2",
        "Day 3",
        "Day 4",
        "Day 5",
        "Day 6",
        "Day 7"
    ];

    this.chartOptions = {
      series: [
        {
          name: 'Present',
          data: data,
          color: '#7239ea'
        },
        {
          name: 'Absent',
          data: data2,
          color: '#D6BBFB'
        }
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'area',
        height: 150,
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
        categories: categories,
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
    let sub = this.themeService.themeChanged.subscribe((theme) => {
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
