import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './components/layout/layout.module';

@Component({
  standalone: true,
  imports: [RouterModule, LayoutModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pet-store';

  ngOnInit(): void {
    console.log('a');
  }
}
