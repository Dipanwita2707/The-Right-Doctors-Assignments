import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person-delete',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="page-header">
        <h2>Delete Person</h2>
        <button class="btn-secondary" routerLink="/people">Back to List</button>
      </div>
      
      <div *ngIf="loading" class="loading-container">
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
        <p>Loading person data...</p>
      </div>
      
      <div *ngIf="error" class="error-container card">
        <p class="error-message">{{ error }}</p>
        <div class="error-actions">
          <button class="btn-primary" (click)="loadPerson()">Try Again</button>
          <button class="btn-secondary" routerLink="/people">Back to List</button>
        </div>
      </div>
      
      <div *ngIf="!loading && !error && person" class="delete-confirmation card fade-in">
        <div class="person-info">
          <div class="person-avatar" *ngIf="person.avatarUrl">
            <img [src]="person.avatarUrl" [alt]="person.firstName + ' ' + person.lastName">
          </div>
          <div class="person-details">
            <h3>{{ person.firstName }} {{ person.lastName }}</h3>
            <p class="person-job" *ngIf="person.jobTitle || person.company">
              {{ person.jobTitle }}{{ person.company ? ' at ' + person.company : '' }}
            </p>
            <p class="person-email">{{ person.email }}</p>
            <p class="person-phone" *ngIf="person.phone">{{ person.phone }}</p>
            <p class="person-location" *ngIf="person.city || person.country">
              {{ person.city }}{{ person.city && person.country ? ', ' : '' }}{{ person.country }}
            </p>
          </div>
        </div>
        
        <div class="warning-message">
          <p>Are you sure you want to delete this person? This action cannot be undone.</p>
        </div>
        
        <div class="delete-actions">
          <button class="btn-secondary" routerLink="/people">Cancel</button>
          <button class="btn-danger" (click)="deletePerson()" [disabled]="deleting">
            <span *ngIf="deleting" class="spinner"></span>
            <span *ngIf="!deleting">Delete</span>
          </button>
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
    
    .error-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .delete-confirmation {
      padding: 2rem;
    }
    
    .person-info {
      display: flex;
      margin-bottom: 2rem;
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
    
    .warning-message {
      background-color: rgba(239, 68, 68, 0.1);
      border-left: 4px solid var(--error-500);
      padding: 1rem;
      margin-bottom: 2rem;
    }
    
    .delete-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
    
    .btn-danger, .btn-secondary {
      min-width: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class PersonDeleteComponent implements OnInit {
  personId?: number;
  person?: Person;
  loading = false;
  deleting = false;
  error = '';
  
  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(this.personId)) {
      this.error = 'Invalid person ID';
      return;
    }
    
    this.loadPerson();
  }
  
  loadPerson(): void {
    if (!this.personId) return;
    
    this.loading = true;
    this.error = '';
    
    this.peopleService.getPerson(this.personId).subscribe({
      next: (person) => {
        this.person = person;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load person data. ' + err.message;
        this.loading = false;
      }
    });
  }
  
  deletePerson(): void {
    if (!this.personId) return;
    
    this.deleting = true;
    this.error = '';
    
    this.peopleService.deletePerson(this.personId).subscribe({
      next: () => {
        this.deleting = false;
        this.router.navigate(['/people'], { queryParams: { deleted: 'true' } });
      },
      error: (err) => {
        this.error = 'Failed to delete person. ' + err.message;
        this.deleting = false;
      }
    });
  }
}