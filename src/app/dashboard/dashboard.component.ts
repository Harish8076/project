import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUsername: string | null = null; // Added property to store username

  constructor(
    public authService: AuthService,
    public toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.authService.dashboardAPI().subscribe(res => {
      this.toastr.success('We are in dashboard');
    });

    // Getting username
    this.loggedInUsername = localStorage.getItem('loggedInUsername');
    
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
