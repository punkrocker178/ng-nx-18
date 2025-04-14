import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CartItemsComponent } from '../cart-items/cart-items.component';

@NgModule({
  imports: [
    RouterModule,
    FooterComponent,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    SearchBarComponent,
    CartItemsComponent
  ],
  declarations: [
    LayoutComponent,
    NavbarComponent
  ],
  exports: [
    LayoutComponent,
    NavbarComponent
  ]
})
export class LayoutModule {

}
