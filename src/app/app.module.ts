import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { AppComponent } from './app.component'
import { TodoPageComponent } from './todo-page/todo-page.component'
import { setRootComponent } from 'src/react/ReactToCE'
import { RootComponent } from './React/RootComponent'

@NgModule({
    declarations: [AppComponent, TodoPageComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

setRootComponent(RootComponent)
