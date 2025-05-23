import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../services/api/authentication.service';
import { AuthenticationPayload } from '../../models/api/authentication.model';
import { LocalStorageService } from '../../services/common/local-storage.service';
import { Router } from '@angular/router';
import { UserInfoContextService } from '../../services/context/user-info-context.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-login-page',
    imports: [
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  /**
   *
   */
  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _localStorage: LocalStorageService,
    private readonly _userInforContextService: UserInfoContextService,
    private readonly _router: Router,
    @Inject(PLATFORM_ID) private _platformId: string
  ) { }

  public mainForm: UntypedFormGroup = new UntypedFormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  onSubmit() {
    const formValue = this.mainForm.value;
    const payload = {
      identifier: formValue.email,
      password: formValue.password
    } as AuthenticationPayload;

    this._authenticateBasic(payload);
  }

  private _authenticateBasic(payload: AuthenticationPayload): void {
    this._authService.authenticate(payload).subscribe((response) => {
      if (isPlatformBrowser(this._platformId)) {
        this._localStorage.set('user', response.user);
      }
      this._userInforContextService.setUser(response.user);
      this._router.navigate(['/']);
    });
  }
}
