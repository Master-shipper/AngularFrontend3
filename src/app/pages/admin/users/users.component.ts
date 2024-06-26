import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ImportsModule } from '../../../imports';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ImportsModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  userDetails: any = {};
  visible: boolean = false;

  constructor(private http: HttpClient, private dialogService: DialogService) {}

    showDialog() {
        this.visible = true;
    }


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<any>('http://localhost:8080/api/v1/user/getUsers').subscribe({
      next: (response: any) => {
        if (response.success) {
          this.users = response.users;
        } else {
          console.error('Failed to fetch users:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  showUserDetails(userId: string) {
    this.http.get<any>(`http://localhost:8080/api/v1/user/getUser/${userId}`).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.userDetails = response.user;
          this.visible = true;
        } else {
          console.error('Failed to fetch user details:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }

  deleteUser(userId: string) {
    // Implement delete logic here
    console.log('Deleting user with ID:', userId);
  }
}
