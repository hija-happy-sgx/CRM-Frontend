import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Lead {
  leadId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  source: string;
  assignedTo: number;
  createdAt: string;
  lastContactedAt?: string;
}

@Component({
  selector: 'app-leads',
  imports: [CommonModule, FormsModule],
  templateUrl: './leads.html',
  styleUrl: './leads.css'
})
export class Leads implements OnInit  {
   leads: Lead[] = [];
  filteredLeads: Lead[] = [];
  selectedLead: Lead | null = null;
  showAddLeadModal = false;
  showViewLeadModal = false;
  searchTerm = '';
  filterStatus = '';
  filterSource = '';
  salesRepId = 1;

  newLead: Partial<Lead> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    source: '',
    status: 'New'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLeads();
  }

  loadLeads() {
    this.http.get<Lead[]>(`/api/SalesRep/leads?salesRepId=${this.salesRepId}`)
      .subscribe({
        next: (data) => {
          this.leads = data;
          this.filteredLeads = data;
        },
        error: (err) => console.error('Error loading leads:', err)
      });
  }

  filterLeads() {
    this.filteredLeads = this.leads.filter(lead => {
      const matchesSearch = !this.searchTerm || 
        lead.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.filterStatus || lead.status === this.filterStatus;
      const matchesSource = !this.filterSource || lead.source === this.filterSource;
      
      return matchesSearch && matchesStatus && matchesSource;
    });
  }

  getLeadsByStatus(status: string): Lead[] {
    return this.leads.filter(lead => lead.status === status);
  }

  createLead() {
    this.http.post(`/api/SalesRep/leads?salesRepId=${this.salesRepId}`, this.newLead)
      .subscribe({
        next: () => {
          this.showAddLeadModal = false;
          this.loadLeads();
          this.resetNewLead();
        },
        error: (err) => console.error('Error creating lead:', err)
      });
  }

  viewLead(lead: Lead) {
    this.selectedLead = lead;
    this.showViewLeadModal = true;
  }

  editLead(lead: Lead) {
    this.showViewLeadModal = false;
    // Implement edit functionality
    console.log('Edit lead:', lead);
  }

  resetNewLead() {
    this.newLead = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      source: '',
      status: 'New'
    };
  }
}
