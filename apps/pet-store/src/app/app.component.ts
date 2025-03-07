import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, MatButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pet-store';

  constructor(
    private _httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
    this._httpClient.get(`api/restaurants`).subscribe((data) => {
      console.log(data);
    });
  }
}
