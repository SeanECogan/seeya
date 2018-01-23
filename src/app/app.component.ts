import { Component } from '@angular/core';
import { SceneFactory } from './shared/factories/scene-factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Not thrilled about maintaining routes in two places...
  routes = [
    { path: './', label: "Home" },
    { path: 'generator', label: "Generator" },
    { path: 'runner', label: "Runner" }
  ]
}
