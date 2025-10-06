import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {

    users: any[] = [];
  error = '';
  success = '';

  // Forms for adding users
  managerForm: FormGroup;
  srmForm: FormGroup;
  salesRepForm: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.managerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['',[  Validators.required, Validators.email]],
      password: ['',Validators.required]
    });

     this.srmForm = this.fb.group({
      name: ['', Validators.required],
      email: ['',[  Validators.required, Validators.email]],
      password: ['',Validators.required],
      managerId: ['', Validators.required]
    });
      this.salesRepForm = this.fb.group({
      name: ['', Validators.required],
      email: ['',[  Validators.required, Validators.email]],  
      password: ['',Validators.required],
      srmId: ['', Validators.required]
    });
  }

    ngOnInit(): void {
    this.loadUsers();
  }

 loadUsers() {
  this.adminService.getAllUsers().subscribe({
    next: (res) => {
      console.log('API response:', res);
      this.users = [
        ...res.managers,
        ...res.salesRepManagers,
        ...res.salesReps
      ];
    },
    error: () => this.error = 'Failed to load users'
  });
}


  addManager() {
    if (!this.managerForm.valid) return;
    this.adminService.createManager(this.managerForm.value).subscribe({
      next: (res) => { this.success = 'Manager added!'; this.loadUsers(); this.managerForm.reset(); },
      error: (err) => this.error = 'Failed to add manager'
    });
  }

  addSalesRepManager() {
    if (!this.srmForm.valid) return;
    const managerId = this.srmForm.value.managerId;
    this.adminService.createSalesRepManager(managerId, this.srmForm.value).subscribe({
      next: (res) => { this.success = 'SalesRepManager added!'; this.loadUsers(); this.srmForm.reset(); },
      error: (err) => this.error = 'Failed to add SalesRepManager'
    });
  }

  addSalesRep() {
    if (!this.salesRepForm.valid) return;
    const srmId = this.salesRepForm.value.srmId;
    this.adminService.createSalesRep(srmId, this.salesRepForm.value).subscribe({
      next: (res) => { this.success = 'SalesRep added!'; this.loadUsers(); this.salesRepForm.reset(); },
      error: (err) => this.error = 'Failed to add SalesRep'
    });
  }
}
