import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from 'src/app/shared/models/chart-options';

@Component({
  selector: '[chart-card-column]',
  templateUrl: './chart-card-column.component.html',
})
export class ChartCardColumnComponent implements OnInit, OnDestroy {
  public chartClass = 'chart-container';
  public chartOptions: Partial<ChartOptions>;
  private subscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {
    const data = [0, 0, 0, 5, 4, 0, 2];
    const data2 = [0, 0, 0, 3, 4, 8, 6];

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
        type: "bar",
        height: 250,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "7 days ago",
          "6 days ago",
          "5 days ago",
          "4 days ago",
          "3 days ago",
          "2 days ago",
          "Yesterday",
        ]
      },

      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: function (val) {
            return val + '$';
          },
        },
      },
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
