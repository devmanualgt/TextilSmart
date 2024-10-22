import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from './layouts/splash-screen/splash-screen.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Modernize Angular Admin Tempplate';
  private unsubscribe: Subscription[] = [];
  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router
  ) {}

  async ngOnInit() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // clear filtration paginations and others
        this.splashScreenService.hide();

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('page-loaded');
        }, 500);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }
}
