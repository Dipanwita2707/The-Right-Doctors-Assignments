import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'https://api.example.com/people';
  
  private mockPeople: Person[] = [
    {
      id: 1,
      firstName: 'Rajesh',
      lastName: 'Sharma',
      email: 'rajesh.sharma@example.com',
      phone: '555-123-4567',
      age: 32,
      address: '123 MG Road',
      city: 'Bangalore',
      country: 'India',
      company: 'TechSolutions India',
      jobTitle: 'Software Developer',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      firstName: 'Priya',
      lastName: 'Patel',
      email: 'priya.patel@example.com',
      phone: '555-987-6543',
      age: 28,
      address: '456 Hill View',
      city: 'Mumbai',
      country: 'India',
      company: 'DesignHub',
      jobTitle: 'UX Designer',
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      firstName: 'Amit',
      lastName: 'Kumar',
      email: 'amit.kumar@example.com',
      phone: '555-567-8901',
      age: 41,
      address: '789 Sector 18',
      city: 'Delhi',
      country: 'India',
      company: 'DataTech Systems',
      jobTitle: 'Project Manager',
      avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 4,
      firstName: 'Deepika',
      lastName: 'Singh',
      email: 'deepika.singh@example.com',
      phone: '555-234-5678',
      age: 35,
      address: '321 Park Street',
      city: 'Kolkata',
      country: 'India',
      company: 'MarketPro',
      jobTitle: 'Marketing Specialist',
      avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: 5,
      firstName: 'Vikram',
      lastName: 'Verma',
      email: 'vikram.verma@example.com',
      phone: '555-345-6789',
      age: 39,
      address: '654 Civil Lines',
      city: 'Pune',
      country: 'India',
      company: 'CodeCraft',
      jobTitle: 'Backend Developer',
      avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg'
    }
  ];

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return of(this.mockPeople).pipe(
      delay(800)
    );
  }

  getPerson(id: number): Observable<Person> {
    const person = this.mockPeople.find(p => p.id === id);
    if (!person) {
      return throwError(() => new Error('Person not found'));
    }
    return of(person).pipe(
      delay(600)
    );
  }

  createPerson(person: Omit<Person, 'id'>): Observable<Person> {
    const newId = this.mockPeople.length > 0 
      ? Math.max(...this.mockPeople.map(p => p.id)) + 1 
      : 1;
    
    const newPerson: Person = {
      ...person,
      id: newId,
      avatarUrl: person.avatarUrl || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${newId}.jpg`
    };
    
    this.mockPeople = [...this.mockPeople, newPerson];
    
    return of(newPerson).pipe(
      delay(800)
    );
  }

  updatePerson(person: Person): Observable<Person> {
    const index = this.mockPeople.findIndex(p => p.id === person.id);
    if (index === -1) {
      return throwError(() => new Error('Person not found'));
    }
    
    this.mockPeople = [
      ...this.mockPeople.slice(0, index),
      person,
      ...this.mockPeople.slice(index + 1)
    ];
    
    return of(person).pipe(
      delay(800)
    );
  }

  deletePerson(id: number): Observable<void> {
    const index = this.mockPeople.findIndex(p => p.id === id);
    if (index === -1) {
      return throwError(() => new Error('Person not found'));
    }
    
    this.mockPeople = [
      ...this.mockPeople.slice(0, index),
      ...this.mockPeople.slice(index + 1)
    ];
    
    return of(undefined).pipe(
      delay(800)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}