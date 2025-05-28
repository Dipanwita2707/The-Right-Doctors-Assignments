import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container header-container">
        <div class="logo">
          <h1>People Manager</h1>
        </div>
        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item">
              <a routerLink="/people" routerLinkActive="active" class="nav-link">People List</a>
            </li>
            <li class="nav-item">
              <a routerLink="/people/new" routerLinkActive="active" class="nav-link">Add Person</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--primary-600);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo h1 {
      font-size: 1.5rem;
      margin: 0;
      font-weight: 600;
    }
    
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-item {
      margin-left: 1.5rem;
    }
    
    .nav-link {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0;
      position: relative;
      transition: color 0.2s;
    }
    
    .nav-link:hover {
      color: white;
    }
    
    .nav-link.active {
      color: white;
    }
    
    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
    }
    
    @media (max-width: 768px) {
      .header-container {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .nav {
        margin-top: 0.75rem;
        width: 100%;
      }
      
      .nav-list {
        width: 100%;
      }
      
      .nav-item {
        margin-left: 0;
        margin-right: 1rem;
      }
    }
  `]
})
export class HeaderComponent {}