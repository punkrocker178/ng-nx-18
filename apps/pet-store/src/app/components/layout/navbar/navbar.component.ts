import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { UserInfoContextService } from '../../../services/context/user-info-context.service';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { User } from '../../../models/api/authentication.model';
import { filter, Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/api/authentication.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    standalone: false
})
export class NavbarComponent implements OnInit, OnDestroy {
  public user = signal<User | null>(null);
  public subscription?: Subscription;

  constructor(
    private readonly _userInforContextService: UserInfoContextService,
    private readonly _localStorage: LocalStorageService,
    private readonly _authenticationService: AuthenticationService,
    private readonly _cookieService: SsrCookieService,
    private readonly _ssrCookieService: SsrCookieService,
    @Inject(PLATFORM_ID) private _platformId: string
  ) {

  }
  ngOnInit(): void {
    this._getUserFromContext();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public logout(): void {
    this._authenticationService.logout().pipe(filter(result => !!result)).subscribe(() => {
      this._userInforContextService.setUser(null);
    });
  }

  private _getUserData(): User | null {
    const user = this._localStorage.get('user');
    return user ? user : null;
  }

  private _getUserFromContext(): void {
    this.subscription = this._userInforContextService.getUser().subscribe((user) => {
      this.user.set(user);
      const tokenCookie = this._ssrCookieService.get('token-date');
      if (!user && isPlatformBrowser(this._platformId) && tokenCookie) {
        const userData = this._getUserData();
        if (userData) {
          this.user.set(userData);
        }
      }
    });
  }

}
