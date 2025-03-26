import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { UserInfoContextService } from '../../../services/context/user-info-context.service';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { User } from '../../../models/api/authentication.model';
import { filter, Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/api/authentication.service';
import { isClientSide } from '../../../utils/utils';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  public user = signal<User | null>(null);
  public subscription?: Subscription;

  constructor(
    private readonly _userInforContextService: UserInfoContextService,
    private readonly _localStorage: LocalStorageService,
    private readonly _authenticationService: AuthenticationService,
    private readonly _cookieService: CookieService
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

  private _getUserData(): User {
    console.log(this._cookieService.get('user'));
    const user = this._cookieService.get('user');
    return user ? JSON.parse(this._cookieService.get('user')) : null;
  }

  private _getUserFromContext(): void {
    this.subscription = this._userInforContextService.getUser().subscribe((user) => {
      this.user.set(user);

      if (!user) {
        const userData = this._getUserData();
        if (userData) {
          this.user.set(userData);
        }
      }
    });
  }

}
