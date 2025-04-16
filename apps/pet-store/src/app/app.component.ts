import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './components/layout/layout.module';
import { UserPermissionsService } from './services/api/user-permissions.service';
import { UserPermissionContextService } from './services/context/user-permission-context.service';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { isPlatformBrowser } from '@angular/common';
@Component({
  imports: [
    RouterModule,
    LayoutModule,
    MatProgressSpinnerModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pet-store';
  isLoading = signal(true);

  constructor(
    @Inject(PLATFORM_ID) private _platformId: string,
    private _userPermissionsService: UserPermissionsService,
    private _userPermissionContextService: UserPermissionContextService
  ) {

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._initializeBrowserApp();
    }
  }

  private _initializeBrowserApp(): void {
    this._userPermissionsService.getUserPermissions().pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe((permissions: any) => {
      this._userPermissionContextService.setUserPermissions(permissions);
    });
  }
}
