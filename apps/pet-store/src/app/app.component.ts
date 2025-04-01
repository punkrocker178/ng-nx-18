import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './components/layout/layout.module';
import { UserPermissionsService } from './services/api/user-permissions.service';

@Component({
  imports: [RouterModule, LayoutModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pet-store';

  constructor(
    private _userPermissionsService: UserPermissionsService,
  ) {

  }

  ngOnInit(): void {
    this._userPermissionsService.getUserPermissions().subscribe((permissions: any) => {
      console.log('User Permissions:', permissions);
    });
  }
}
