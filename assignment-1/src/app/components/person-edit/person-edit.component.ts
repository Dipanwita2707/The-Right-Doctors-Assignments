import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="page-header">
        <h2>{{ isNewPerson ? 'Add New Person' : 'Edit Person' }}</h2>
        <button class="btn-secondary" routerLink="/people">Back to List</button>
      </div>
      
      <div *ngIf="loading" class="loading-container">
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
        <p>{{ isNewPerson ? 'Preparing form...' : 'Loading person data...' }}</p>
      </div>
      
      <div *ngIf="error" class="error-container card">
        <p class="error-message">{{ error }}</p>
        <div class="error-actions">
          <button class="btn-primary" (click)="loadPerson()">Try Again</button>
          <button class="btn-secondary" routerLink="/people">Back to List</button>
        </div>
      </div>
      
      <form *ngIf="!loading && !error" [formGroup]="personForm" (ngSubmit)="onSubmit()" class="person-form card fade-in">
        <div class="form-grid">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input type="text" id="firstName" formControlName="firstName" class="form-control">
            <div *ngIf="submitted && personForm.get('firstName')?.errors" class="error-message">
              <div *ngIf="personForm.get('firstName')?.errors?.['required']">First name is required</div>
              <div *ngIf="personForm.get('firstName')?.errors?.['maxlength']">First name must be less than 50 characters</div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input type="text" id="lastName" formControlName="lastName" class="form-control">
            <div *ngIf="submitted && personForm.get('lastName')?.errors" class="error-message">
              <div *ngIf="personForm.get('lastName')?.errors?.['required']">Last name is required</div>
              <div *ngIf="personForm.get('lastName')?.errors?.['maxlength']">Last name must be less than 50 characters</div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" formControlName="email" class="form-control">
            <div *ngIf="submitted && personForm.get('email')?.errors" class="error-message">
              <div *ngIf="personForm.get('email')?.errors?.['required']">Email is required</div>
              <div *ngIf="personForm.get('email')?.errors?.['email']">Please enter a valid email</div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" formControlName="phone" class="form-control">
          </div>
          
          <div class="form-group">
            <label for="age">Age</label>
            <input type="number" id="age" formControlName="age" class="form-control">
            <div *ngIf="submitted && personForm.get('age')?.errors" class="error-message">
              <div *ngIf="personForm.get('age')?.errors?.['min']">Age must be at least 18</div>
              <div *ngIf="personForm.get('age')?.errors?.['max']">Age must be less than 120</div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="company">Company</label>
            <input type="text" id="company" formControlName="company" class="form-control">
          </div>
          
          <div class="form-group">
            <label for="jobTitle">Job Title</label>
            <input type="text" id="jobTitle" formControlName="jobTitle" class="form-control">
          </div>
          
          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" formControlName="address" class="form-control">
          </div>
          
          <div class="form-group">
            <label for="city">City</label>
            <input type="text" id="city" formControlName="city" class="form-control">
          </div>
          
          <div class="form-group">
            <label for="country">Country</label>
            <input type="text" id="country" formControlName="country" class="form-control">
          </div>
          
          <div class="form-group">
            <label for="avatarUrl">Avatar URL</label>
            <input type="text" id="avatarUrl" formControlName="avatarUrl" class="form-control">
          </div>
        </div>
        
        <div class="avatar-preview" *ngIf="personForm.get('avatarUrl')?.value">
          <img [src]="personForm.get('avatarUrl')?.value" alt="Avatar preview">
        </div>
        
        <div class="form-footer">
          <button type="button" class="btn-secondary" routerLink="/people">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="saving">
            <span *ngIf="saving" class="spinner"></span>
            <span *ngIf="!saving">{{ isNewPerson ? 'Create Person' : 'Update Person' }}</span>
          </button>
        </div>
      </form>
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
    
    .person-form {
      padding: 2rem;
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .avatar-preview {
      margin-top: 1.5rem;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid var(--neutral-300);
    }
    
    .avatar-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .form-footer {
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
    
    .btn-primary, .btn-secondary {
      min-width: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    @media (min-width: 768px) {
      .form-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class PersonEditComponent implements OnInit {
  personForm: FormGroup;
  personId?: number;
  isNewPerson = true;
  loading = false;
  saving = false;
  error = '';
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personForm = this.createForm();
  }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.personId = id ? Number(id) : undefined;
    this.isNewPerson = !this.personId;
    
    if (!this.isNewPerson && this.personId) {
      this.loadPerson();
    }
  }
  
  createForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      age: [null, [Validators.min(18), Validators.max(120)]],
      company: [''],
      jobTitle: [''],
      address: [''],
      city: [''],
      country: ['India'],
      avatarUrl: ['']
    });
  }
  
  loadPerson(): void {
    if (!this.personId) return;
    
    this.loading = true;
    this.error = '';
    
    this.peopleService.getPerson(this.personId).subscribe({
      next: (person) => {
        this.personForm.patchValue(person);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load person data. ' + err.message;
        this.loading = false;
      }
    });
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    if (this.personForm.invalid) {
      return;
    }
    
    this.saving = true;
    this.error = '';
    
    const personData = this.personForm.value;
    
    if (this.isNewPerson) {
      this.createNewPerson(personData);
    } else {
      this.updateExistingPerson(personData);
    }
  }
  
  createNewPerson(personData: Omit<Person, 'id'>): void {
    this.peopleService.createPerson(personData).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/people'], { queryParams: { created: 'true' } });
      },
      error: (err) => {
        this.error = 'Failed to create person. ' + err.message;
        this.saving = false;
      }
    });
  }
  
  updateExistingPerson(personData: Omit<Person, 'id'>): void {
    if (!this.personId) return;
    
    const updatedPerson: Person = {
      ...personData,
      id: this.personId
    };
    
    this.peopleService.updatePerson(updatedPerson).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/people'], { queryParams: { updated: 'true' } });
      },
      error: (err) => {
        this.error = 'Failed to update person. ' + err.message;
        this.saving = false;
      }
    });
  }
}