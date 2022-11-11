import { Component } from "@angular/core";
import { sections } from "./sidebar-contents";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent {
  sections = sections;
  activeRoute = "";
}
