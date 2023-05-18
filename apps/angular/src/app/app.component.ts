import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { akarIcon, akarThreeLineHorizontal } from '@ng-icons/akar-icons';
import { HeaderComponent } from './components/general-use/header/header.component';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './components/general-use/link/link.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    LinkComponent,
    NgIconComponent
  ],
  providers: [provideIcons({ akarIcon, akarThreeLineHorizontal })],
  selector: "mixtapemadness-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  smallMenuOpen = false;
  
  toggleSmallMenu(tf: boolean) {
    this.smallMenuOpen = tf;
  }
}
