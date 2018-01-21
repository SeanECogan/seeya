import { Component } from '@angular/core';
import { Link } from './shared/link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seeya';

  link = new Link(
    1,
    2
  );
}
