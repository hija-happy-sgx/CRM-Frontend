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

managers: any[] = [];
srms: any[] = [];
filteredManagers: any[] = [];
filteredSalesRepManagers: any[] = [];

showManagerList = false;
showSRMList = false;


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
      managerId: ['', Validators.required],   // hidden value for API
  managerName: ['', Validators.required]  // for autocomplete input
    });
      this.salesRepForm = this.fb.group({
      name: ['', Validators.required],
      email: ['',[  Validators.required, Validators.email]],  
      password: ['',Validators.required],
       srmId: ['', Validators.required],    // hidden value
  srmName: ['', Validators.required]
    });
  }


  //   this.userService.getAllManagers().subscribe({
  //   next: (res) => this.managers = res.data,
  //   error: (err) => console.error(err)
  // });

    ngOnInit(): void {
     this.loadUsers();
     this.loadManagers();
     this.loadSalesRepManagers();

  // Load all managers for dropdown/autocomplete
  this.adminService.getAllManagers().subscribe({
    next: (res) => this.managers = res.data,
    error: (err) => console.error(err)
  });

  // Load all SalesRepManagers for SR dropdown
  this.adminService.getAllSalesRepManagers().subscribe({
    next: (res) => this.srms = res.data,
    error: (err) => console.error(err)
  });
  }

  // Load all managers from backend
loadManagers() {
  this.adminService.getAllManagers().subscribe({
    next: (res) => this.managers = res.data,
    error: (err) => console.error(err)
  });
}

// Filter as user types
filterManagers() {
  const query = this.srmForm.get('managerName')?.value?.toLowerCase() || '';
  this.filteredManagers = this.managers.filter(m =>
    m.name.toLowerCase().includes(query)
  );
  this.showManagerList = true;
}

// When a manager is selected
selectManager(manager: any) {
  this.srmForm.patchValue({
    managerId: manager.managerId,
    managerName: manager.name
  });
  this.showManagerList = false;
}

// load salesrep managers from the backend
loadSalesRepManagers() {
  this.adminService.getAllSalesRepManagers().subscribe({
    next: (res) => this.srms = res.data,
    error: (err) => console.error(err)
  });
}

filterSalesRepManagers() {
  const query = this.salesRepForm.get('srmName')?.value?.toLowerCase() || '';
  this.filteredSalesRepManagers = this.srms.filter(srm =>
    srm.name.toLowerCase().includes(query)
  );
  this.showSRMList = true;  
}

selectSalesRepManager(srm: any) {
  this.salesRepForm.patchValue({
    srmId: srm.srmId,
    srmName: srm.name
  });
  this.showSRMList = false;
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
    next: (res) => {
      // Success feedback
      this.success = 'SalesRepManager added successfully!';
      this.error = '';               // clear previous errors
      this.loadUsers();              // refresh list
      this.srmForm.reset();          // reset form
    },
    error: (err) => {
      // Error feedback
      this.error = 'Failed to add SalesRepManager. Please try again.';
      this.success = '';             // clear previous success
      console.error(err);
    }
  });
}


  addSalesRep() {

    const srmId = this.salesRepForm.value.srmId;
    this.adminService.createSalesRep(srmId, this.salesRepForm.value).subscribe({
      next: (res) => { 
        this.success = 'SalesRep added!'; 
        this.error = '';
        this.loadUsers(); 
        this.salesRepForm.reset(); 
      },
      error: (err) => {
        this.error = 'Failed to add SalesRep';
        this.success = '';  
        console.error(err);
      }
    });
  
  }
}
