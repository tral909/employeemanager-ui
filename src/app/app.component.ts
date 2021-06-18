import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Subject, interval } from 'rxjs';
import { map, debounce } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  private subject = new Subject<string>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();

    // this.subject.pipe(
    //   debounce(() => interval(300)))
    //   .subscribe((str: string) =>
    //   this.filteredEmployees = this.employees.filter(e => e.name.toLowerCase().includes(str.toLowerCase())));
  }

  ngOnDestroy(): void {
    // this.subject.unsubscribe();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => this.employees = response,
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    document.getElementById('update-employee-form').click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => this.getEmployees(),
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  public onDeleteEmployee(id: number): void {
    document.getElementById('delete-employee').click();
    this.employeeService.deleteEmployee(id).subscribe(
      (response: void) => this.getEmployees(),
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  // search(evt) {
  //   this.subject.next(evt.target.value);
  // }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const e of this.employees) {
      if (e.name.toLowerCase().includes(key.toLowerCase())
      || e.email.toLowerCase().includes(key.toLowerCase())
      || e.phone.toLowerCase().includes(key.toLowerCase())
      || e.jobTitle.toLowerCase().includes(key.toLowerCase())) {
        results.push(e);
      }
    }
    if (!key) {
      this.getEmployees();
    } else {
      this.employees = results;
    }
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    } else if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    } else if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
    container.removeChild(button);
  }

}
