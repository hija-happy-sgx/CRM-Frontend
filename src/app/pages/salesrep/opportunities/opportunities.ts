import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Deal {
  dealId: number;
  dealName: string;
  amount: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  leadId: number;
  accountId: number;
  assignedTo: number;
  createdAt: string;
  clientName?: string;
  company?: string;
}

@Component({
  selector: 'app-opportunities',
  imports: [FormsModule, CommonModule],
  templateUrl: './opportunities.html',
  styleUrl: './opportunities.css'
})
export class Opportunities implements OnInit {
  deals: Deal[] = [];
  filteredDeals: Deal[] = [];
  selectedDeal: Deal | null = null;
  showViewDealModal = false;
  showAddDealModal = false;
  viewMode: 'pipeline' | 'table' = 'pipeline';
  searchTerm = '';
  filterStage = '';
  salesRepId = 1;

  stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  newDeal: Partial<Deal> = {
    dealName: '',
    amount: 0,
    stage: '',
    probability: 50,
    expectedCloseDate: '',
    company: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDeals();
  }
   loadDeals() {
    this.http.get<Deal[]>(`http://localhost:5264/api/SalesRep/deals?salesRepId=${this.salesRepId}`)
      .subscribe({
        next: (data) => {
          this.deals = data;
          this.filteredDeals = data;
        },
        error: (err) => console.error('Error loading deals:', err)
      });
  }

    filterDeals() {
    this.filteredDeals = this.deals.filter(deal => {
      const matchesSearch = !this.searchTerm || 
        deal.dealName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (deal.company && deal.company.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesStage = !this.filterStage || deal.stage === this.filterStage;
      
      return matchesSearch && matchesStage;
    });
  }

  getDealsByStage(stage: string): Deal[] {
    return this.deals.filter(deal => deal.stage === stage);
  }

  getStageValue(stage: string): number {
    return this.getDealsByStage(stage).reduce((sum, deal) => sum + deal.amount, 0);
  }

  getTotalValue(): number {
    return this.deals.reduce((sum, deal) => sum + deal.amount, 0);
  }

  getWinRate(): number {
    const closedDeals = this.deals.filter(d => d.stage === 'Closed Won' || d.stage === 'Closed Lost');
    if (closedDeals.length === 0) return 0;
    const wonDeals = closedDeals.filter(d => d.stage === 'Closed Won');
    return Math.round((wonDeals.length / closedDeals.length) * 100);
  }

  createDeal() {
    this.http.post(`http://localhost:5264/api/SalesRep/deals?salesRepId=${this.salesRepId}`, this.newDeal)
      .subscribe({
        next: () => {
          this.showAddDealModal = false;
          this.loadDeals();
          this.resetNewDeal();
        },
        error: (err) => console.error('Error creating deal:', err)
      });
  }

  viewDeal(deal: Deal) {
    this.http.get<Deal>(`/api/SalesRep/deal/${deal.dealId}?salesRepId=${this.salesRepId}`)
      .subscribe({
        next: (data) => {
          this.selectedDeal = data;
          this.showViewDealModal = true;
        },
        error: (err) => console.error('Error loading deal details:', err)
      });
  }

  editDeal(deal: Deal) {
    this.showViewDealModal = false;
    // Implement edit functionality
    console.log('Edit deal:', deal);
  }

  resetNewDeal() {
    this.newDeal = {
      dealName: '',
      amount: 0,
      stage: '',
      probability: 50,
      expectedCloseDate: '',
      company: ''
    };
  }

}
