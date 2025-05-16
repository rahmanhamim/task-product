import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser } from '../model';
import { Router } from '@angular/router';

const BASE_URL = 'https://dummyjson.com';
const USER_STORAGE_KEY = 'loggedInUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  private userSubject = new BehaviorSubject<IUser | null>(
    this.getUserFromStorage()
  );
  public user$ = this.userSubject.asObservable();

  // Login method
  login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<IUser> {
    return this.httpClient.post<IUser>(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
  }

  // Call this after successful login to set user state
  setUser(user: IUser): void {
    this.userSubject.next(user);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  // Logout method
  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    this.router.navigate(['/']);
  }

  // Helper to get user from localStorage
  private getUserFromStorage(): IUser | null {
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.user$.pipe(map((user) => !!user));
  }
}
