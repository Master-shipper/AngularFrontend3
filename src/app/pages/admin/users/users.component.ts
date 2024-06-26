import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = []; // Initialize as an empty array to hold multiple users

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers(); // Fetch all users when component initializes
  }

  getUsers() {
    this.http.get('http://localhost:8080/api/v1/user/getUsers') // Assuming your backend API endpoint for fetching all users
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.users = response.users; // Assuming the backend returns an array of users in 'users' field
          } else {
            console.error(response.message);
          }
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
  }
}
