import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { akarIcon, akarThreeLineHorizontal } from '@ng-icons/akar-icons';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, NgIconComponent],
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
