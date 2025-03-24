import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  public isLogin = signal(false);

  private _subscription: Subscription | null = null;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router
  ) {
  }

  ngOnInit(): void {
    this._subscription = this._router.events.pipe(
      filter((e => e instanceof NavigationEnd))
    ).subscribe((event) => {
      this.isLogin.set(event.url === '/login');
    });
  }

  onDestory(): void {
    this._subscription?.unsubscribe();
  }

}
