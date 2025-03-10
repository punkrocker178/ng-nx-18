import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  imports: [
    RouterModule,
    FooterComponent
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
