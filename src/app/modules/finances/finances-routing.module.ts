import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancesComponent } from './/finances/finances.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { IncomeComponent } from './pages/income/income.component';
import { ChartsComponent } from './pages/charts/charts.component';
const routes: Routes = [
  {
    path: '',
    component: FinancesComponent,
    children: [
      { path: 'expenses', component: ExpensesComponent },
      { path: 'income', component: IncomeComponent },
      { path: 'charts', component: ChartsComponent },
      { path: '', redirectTo: 'expenses', pathMatch: 'full' },
      { path: '**', redirectTo: 'expenses' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancesRoutingModule {
  constructor() {
    console.log('FinancesRoutingModule loaded');
  }
}


