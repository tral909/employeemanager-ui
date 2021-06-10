import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root'})
export class EmployeeService {
    private apiBaseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiBaseUrl}/employee/all`);
    }

    public getEmployee(id: number): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiBaseUrl}/employee/${id}`);
    }

    public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiBaseUrl}/employee`, employee);
    }

    public updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiBaseUrl}/employee`, employee);
    }

    public deleteEmployee(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiBaseUrl}/employee/${id}`);
    }
}
