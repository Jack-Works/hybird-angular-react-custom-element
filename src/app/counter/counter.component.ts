import { Component, OnInit } from '@angular/core'
import { Counter } from './Counter'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit, ReactComponentProps<typeof Counter> {
  count = 0
  onChange($event: EventsOfComponent<typeof Counter>['onChange']) {
    this.count = $event.detail
  }

  ngOnInit() {}
}
