import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container">
      <div class="page-header">
        <h2>People List</h2>
        <button class="btn-primary" routerLink="/people/new">Add New Person</button>
      </div>
      
      <div class="card filter-card">
        <div class="search-container">
          <input 
            type="text" 
            class="form-control search-input" 
            placeholder="Search by name or email..." 
            [(ngModel)]="searchTerm"
            (input)="applyFilters()"
          >
        </div>
        
        <div class="sort-container">
          <label for="sortBy">Sort by:</label>
          <select 
            id="sortBy" 
            class="form-control sort-select" 
            [(ngModel)]="sortBy" 
            (change)="applyFilters()"
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
          </select>
          
          <button 
            class="sort-direction-btn" 
            (click)="toggleSortDirection()"
            [attr.aria-label]="sortAscending ? 'Sort descending' : 'Sort ascending'"
          >
            <span class="sort-icon">{{ sortAscending ? '↑' : '↓' }}</span>
          </button>
        </div>
      </div>
      
      <div *ngIf="loading" class="loading-container">
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
        <p>Loading people...</p>
      </div>
      
      <div *ngIf="error" class="error-container card">
        <p class="error-message">{{ error }}</p>
        <button class="btn-primary" (click)="loadPeople()">Try Again</button>
      </div>
      
      <div *ngIf="!loading && !error && filteredPeople.length === 0" class="empty-state card">
        <p>No people found. Try adjusting your search criteria or add a new person.</p>
        <button class="btn-primary" routerLink="/people/new">Add Person</button>
      </div>
      
      <div *ngIf="!loading && !error && filteredPeople.length > 0" class="people-list fade-in">
        <div *ngFor="let person of filteredPeople" class="person-card card">
          <div class="person-info">
            <div class="person-avatar" *ngIf="person.avatarUrl">
              <img [src]="person.avatarUrl" [alt]="person.firstName + ' ' + person.lastName">
            </div>
            <div class="person-details">
              <h3>{{ person.firstName }} {{ person.lastName }}</h3>
              <p class="person-job">{{ person.jobTitle }}{{ person.company ? ' at ' + person.company : '' }}</p>
              <p class="person-email">{{ person.email }}</p>
              <p class="person-phone" *ngIf="person.phone">{{ person.phone }}</p>
              <p class="person-location" *ngIf="person.city || person.country">
                {{ person.city }}{{ person.city && person.country ? ', ' : '' }}{{ person.country }}
              </p>
            </div>
          </div>
          <div class="person-actions">
            <button class="btn-secondary" [routerLink]="['/people', person.id, 'edit']">Edit</button>
            <button class="btn-danger" [routerLink]="['/people', person.id, 'delete']">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      margin-top: 1.5rem;
    }
    
    .filter-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .search-container {
      flex: 1;
    }
    
    .search-input {
      width: 100%;
    }
    
    .sort-container {
      display: flex;
      align-items: center;
      margin-left: 1rem;
    }
    
    .sort-container label {
      margin-right: 0.5rem;
      margin-bottom: 0;
    }
    
    .sort-select {
      width: auto;
    }
    
    .sort-direction-btn {
      background: none;
      border: 1px solid var(--neutral-300);
      border-radius: 4px;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.5rem;
    }
    
    .sort-direction-btn:hover {
      background-color: var(--neutral-100);
    }
    
    .sort-icon {
      font-size: 1.25rem;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
    }
    
    .spinner-container {
      margin-bottom: 1rem;
    }
    
    .error-container {
      padding: 2rem;
      text-align: center;
      background-color: rgba(239, 68, 68, 0.1);
      border: 1px solid var(--error-500);
    }
    
    .error-container button {
      margin-top: 1rem;
    }
    
    .empty-state {
      padding: 2rem;
      text-align: center;
    }
    
    .empty-state button {
      margin-top: 1rem;
    }
    
    .people-list {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 1rem;
    }
    
    .person-card {
      display: flex;
      flex-direction: column;
    }
    
    .person-info {
      display: flex;
      margin-bottom: 1rem;
    }
    
    .person-avatar {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 1rem;
      flex-shrink: 0;
    }
    
    .person-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .person-details {
      flex: 1;
    }
    
    .person-details h3 {
      margin-bottom: 0.25rem;
    }
    
    .person-job {
      color: var(--neutral-700);
      margin-bottom: 0.5rem;
    }
    
    .person-email, .person-phone, .person-location {
      color: var(--neutral-600);
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
    }
    
    .person-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }
    
    @media (min-width: 768px) {
      .people-list {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .filter-card {
        flex-direction: column;
        align-items: stretch;
      }
      
      .sort-container {
        margin-left: 0;
        margin-top: 1rem;
      }
      
      .person-card {
        flex-direction: column;
      }
      
      .person-actions {
        margin-top: 1rem;
      }
    }
  `]
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  filteredPeople: Person[] = [];
  loading = true;
  error = '';
  
  // Filtering and sorting
  searchTerm = '';
  sortBy = 'lastName';
  sortAscending = true;
  
  constructor(private peopleService: PeopleService) {}
  
  ngOnInit(): void {
    this.loadPeople();
  }
  
  loadPeople(): void {
    this.loading = true;
    this.error = '';
    
    this.peopleService.getPeople().subscribe({
      next: (people) => {
        this.people = people;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load people. ' + err.message;
        this.loading = false;
      }
    });
  }
  
  applyFilters(): void {
    // First filter by search term
    let result = this.people;
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(person => 
        person.firstName.toLowerCase().includes(term) ||
        person.lastName.toLowerCase().includes(term) ||
        person.email.toLowerCase().includes(term) ||
        (person.company && person.company.toLowerCase().includes(term))
      );
    }
    
    // Then sort
    result = [...result].sort((a, b) => {
      let aValue = a[this.sortBy as keyof Person];
      let bValue = b[this.sortBy as keyof Person];
      
      // Handle null/undefined values
      if (aValue === undefined || aValue === null) aValue = '';
      if (bValue === undefined || bValue === null) bValue = '';
      
      // Convert to string for comparison
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      
      if (this.sortAscending) {
        return aString.localeCompare(bString);
      } else {
        return bString.localeCompare(aString);
      }
    });
    
    this.filteredPeople = result;
  }
  
  toggleSortDirection(): void {
    this.sortAscending = !this.sortAscending;
    this.applyFilters();
  }
}