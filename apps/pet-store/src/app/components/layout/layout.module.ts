import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";

@NgModule({
  imports: [
    RouterModule,
    FooterComponent,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
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
