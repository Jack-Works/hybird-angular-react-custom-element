import { Component, OnInit } from '@angular/core'
import { Counter } from './Counter'
import { GenerateAngularTemplate } from 'src/react/ReactToCE'

@Component({
  selector: 'app-counter',
  template: GenerateAngularTemplate(Counter, CounterComponent)
})
export class CounterComponent implements OnInit, ReactComponentProps<typeof Counter> {
  count = 0
  onChange($event: EventsOfComponent<typeof Counter>['onChange']) {
    this.count = $event.detail
  }

  ngOnInit() {}
}
