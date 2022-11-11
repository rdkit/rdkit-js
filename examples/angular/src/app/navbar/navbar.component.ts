import { Component } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
  burgerState = false;

  constructor() {}

  toggleBurgerState() {
    this.burgerState = !this.burgerState;
  }
}
