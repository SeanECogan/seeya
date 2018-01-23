import { Component, OnInit, Input } from '@angular/core';

import { SceneModel } from '../../shared/models/scene-model';

@Component({
  selector: 'seeya-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  @Input() scene: SceneModel;

  constructor() {}

  ngOnInit() {
  }
}
