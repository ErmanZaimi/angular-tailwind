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

  constructor(private http: HttpClient) {}

 
  getContracts(page: number, itemsPerPage: number, searchTerm: string, sort: { field: string; order: 'asc' | 'desc' }[]): Observable<any> {
    const query = qs.stringify({
      pagination: { page, pageSize: itemsPerPage },
      filters: searchTerm ? { name: { $contains: searchTerm } } : {},
      sort: sort.map(s => `${s.field}:${s.order}`)
    }, { encodeValuesOnly: true });

    return this.http.get(`${this.baseUrl}?${query}`);
  }

  updateContract(id: number, contract: Partial<Contract>): Observable<Contract> {
    return this.http.put<Contract>(`${this.baseUrl}/${id}`, { data: contract });
  }
  
  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`); 
  }
  
}

