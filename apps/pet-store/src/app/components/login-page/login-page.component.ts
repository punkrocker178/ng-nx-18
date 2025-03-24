import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationPayload } from '../../models/api/authentication.model';

@Component({
  selector: 'app-login-page',
  standalone: true,
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
  private readonly _authService: AuthenticationService
) {}

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
    this._authService.authenticate(payload).subscribe((response) => {
      console.log(response);
    });
}
}
