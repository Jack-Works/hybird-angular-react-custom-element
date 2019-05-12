import { Component, ApplicationRef } from "@angular/core";
import "./Components/ToWebComp";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  count = 0;
  onCountChange = (newCount: number) => {
    console.log(newCount);
    this.count = newCount;
    this.ref.tick();
  };
  constructor(public ref: ApplicationRef) {}
}
