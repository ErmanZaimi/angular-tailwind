import { Component, OnInit } from '@angular/core';
import { StrapiService } from 'src/app/core/services/strapi.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  incomeData: number[] = Array(12).fill(0);
  incomeLabels: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  expenseData: number[] = Array(12).fill(0);
  expenseLabels: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  incomeTitles: { [key: number]: { title: string, date: string }[] } = {};
  expenseTitles: { [key: number]: { title: string, date: string }[] } = {};
  
  incomeChart: any;
  expenseChart: any;
  
  totalIncome: number = 0; // Total income
  totalExpenses: number = 0; // Total expenses

  constructor(private strapiService: StrapiService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchIncomeData();
    this.fetchExpenseData();
  }

  fetchIncomeData(): void {
    this.strapiService.getIncome(1, 100, '', []).subscribe((response: any) => {
      this.totalIncome = 0; // Reset total income
      response.data.forEach((item: any) => {
        const date = new Date(item.attributes.date);
        const month = date.getMonth();
        this.incomeData[month] += item.attributes.amount;
        this.totalIncome += item.attributes.amount; // Add to total income
        if (!this.incomeTitles[month]) {
          this.incomeTitles[month] = [];
        }
        this.incomeTitles[month].push({ title: item.attributes.title, date: item.attributes.date });
      });
      this.createIncomeChart();
    });
  }

  fetchExpenseData(): void {
    this.strapiService.getExpenses(1, 100, '', []).subscribe((response: any) => {
      this.totalExpenses = 0; // Reset total expenses
      response.data.forEach((item: any) => {
        const date = new Date(item.attributes.date);
        const month = date.getMonth();
        this.expenseData[month] += item.attributes.amount;
        this.totalExpenses += item.attributes.amount; // Add to total expenses
        if (!this.expenseTitles[month]) {
          this.expenseTitles[month] = [];
        }
        this.expenseTitles[month].push({ title: item.attributes.title, date: item.attributes.date });
      });
      this.createExpenseChart();
    });
  }

  createIncomeChart(): void {
    const ctx = document.getElementById('incomeChart') as HTMLCanvasElement;
    this.incomeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.incomeLabels,
        datasets: [{
          label: 'Income',
          data: this.incomeData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const monthIndex = context.dataIndex;
                const entries = this.incomeTitles[monthIndex] || [];
                const totalAmount = context.raw;
                return [`${context.dataset.label}: $${totalAmount}`, ...entries.map(entry => `Title: ${entry.title}, Date: ${entry.date}`)];
              }
            }
          }
        }
      }
    });
  }

  createExpenseChart(): void {
    const ctx = document.getElementById('expenseChart') as HTMLCanvasElement;
    this.expenseChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.expenseLabels,
        datasets: [{
          label: 'Expenses',
          data: this.expenseData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const monthIndex = context.dataIndex;
                const entries = this.expenseTitles[monthIndex] || [];
                const totalAmount = context.raw;
                return [`${context.dataset.label}: $${totalAmount}`, ...entries.map(entry => `Title: ${entry.title}, Date: ${entry.date}`)];
              }
            }
          }
        }
      }
    });
  }
}
