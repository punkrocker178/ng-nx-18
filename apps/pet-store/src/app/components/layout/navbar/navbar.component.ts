import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { UserInfoContextService } from '../../../services/context/user-info-context.service';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { User } from '../../../models/api/authentication.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  public user = signal<User>(new User());
  public subscription?: Subscription;

  constructor(
    private readonly _userInforContextService: UserInfoContextService,
    private readonly _localStorage: LocalStorageService
  ) {

  }
  ngOnInit(): void {
    const currentUser = this._getUserFromLocalStorage();
    if (currentUser) {
      this.user.set(currentUser);
    } else {
      this._getUserFromContext();
    }
  }

  private _getUserFromLocalStorage(): User {
    return this._localStorage.get('user');
  }

  private _getUserFromContext(): void {
    this.subscription = this._userInforContextService.getUser().subscribe((user) => {
      this.user.set(user);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
