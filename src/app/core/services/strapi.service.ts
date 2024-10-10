import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract.model';
import { environment } from 'src/environments/environment';
import * as qs from 'qs';
@Injectable({
  providedIn: 'root' 
})
export class StrapiService {
  
  private baseUrl = environment.APIurl+'/api/contracts'; 
  private expensesUrl = environment.APIurl + '/api/expenses';
  private incomeUrl = environment.APIurl + '/api/incomes'; 
  constructor(private http: HttpClient) {}

 
  getContracts(page: number, itemsPerPage: number, searchTerm: string, sort: { field: string; order: 'asc' | 'desc' }[]): Observable<any> {
    const query = qs.stringify({
      pagination: { page, pageSize: itemsPerPage },
      filters: searchTerm ? { name: { $contains: searchTerm } } : {},
      sort: sort.map(s => `${s.field}:${s.order}`)
    }, { encodeValuesOnly: true });

    return this.http.get(`${this.baseUrl}?${query}`);
  }
  getExpenses(page: number, itemsPerPage: number, searchTerm: string, sort: { field: string; order: 'asc' | 'desc' }[]): Observable<any> {
    const query = qs.stringify({
      pagination: { page, pageSize: itemsPerPage },
      filters: searchTerm ? { 
        title: { $contains: searchTerm } // Remove category filter if needed
    } : {},
      sort: sort.length > 0 ? sort.map(s => `${s.field}:${s.order}`) : undefined
    }, { encodeValuesOnly: true });
  
    console.log('Query:', query); // Add this line to see the constructed query
  
    return this.http.get(`${this.expensesUrl}?${query}`);
  }
  getIncome(page: number, itemsPerPage: number, searchTerm: string, sort: { field: string; order: 'asc' | 'desc' }[]): Observable<any> {
    const query = qs.stringify({
      pagination: { page, pageSize: itemsPerPage },
      filters: searchTerm ? { 
        title: { $contains: searchTerm }
      } : {},
      sort: sort.length > 0 ? sort.map(s => `${s.field}:${s.order}`) : undefined
    }, { encodeValuesOnly: true });
  
    console.log('Query:', query); // Debugging
  
    return this.http.get(`${this.incomeUrl}?${query}`); // Updated to use income URL
  }
  
  updateContract(id: number, contract: Partial<Contract>): Observable<Contract> {
    return this.http.put<Contract>(`${this.baseUrl}/${id}`, { data: contract });
  }
  
  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`); 
  }
  createContract(contract: any): Observable<Contract> {
    return this.http.post<Contract>(this.baseUrl, { data: contract });
  }
  createExpense(expense: { amount: number; category: string; description: string; date: string; title: string }): Observable<any> {
    return this.http.post(this.expensesUrl, {
      data: expense
    });
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.expensesUrl}/${id}`);
  }
  
  updateExpense(id: string, expense: any) {
    return this.http.put(`${this.expensesUrl}/${id}`, { data: expense });
  }
  createIncome(income: { amount: number; Category: string; description: string; date: string; title: string }): Observable<any> { // Updated method name
    return this.http.post(this.incomeUrl, {
      data: income
    });
  }

  deleteIncome(id: number): Observable<void> { // Updated method name
    return this.http.delete<void>(`${this.incomeUrl}/${id}`);
  }
  
  updateIncome(id: string, income: any) { // Updated method name
    return this.http.put(`${this.incomeUrl}/${id}`, { data: income });
  }

}

