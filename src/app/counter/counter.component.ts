import { Component, OnInit } from '@angular/core'
import './Counter'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  count = 0
  onChange(newCount: CustomEvent<number>) {
    this.count = newCount.detail
  }

  ngOnInit() {}
}
