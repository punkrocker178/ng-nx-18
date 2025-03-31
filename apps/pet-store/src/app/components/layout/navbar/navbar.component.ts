import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { UserInfoContextService } from '../../../services/context/user-info-context.service';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { User } from '../../../models/api/authentication.model';
import { filter, Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/api/authentication.service';

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
    private readonly _authenticationService: AuthenticationService
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

  private _getUserFromLocalStorage(): User {
    return this._localStorage.get('user');
  }

  private _getUserFromContext(): void {
    this.subscription = this._userInforContextService.getUser().subscribe((user) => {
      this.user.set(user);

      if (!user) {
        const userFromLocalStorage = this._getUserFromLocalStorage();
        if (userFromLocalStorage) {
          this.user.set(userFromLocalStorage);
        }
      }
    });
  }

}
