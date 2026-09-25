import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';
import { ThemeService } from './services/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private authService = inject(AuthService);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  protected isLoggedIn = this.authService.isLoggedIn;
  protected theme = this.themeService.theme;

  protected toggleTheme() {
    this.themeService.toggle();
  }

  protected onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
