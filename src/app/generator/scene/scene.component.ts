import { Component, OnInit, Input } from '@angular/core';

import { SceneModel } from '../../shared/models/scene-model';
import { SceneService } from './scene.service';

@Component({
  selector: 'seeya-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  @Input() scene: SceneModel;

  constructor(
    private sceneService: SceneService
  ) {}

  ngOnInit() {
  }

  deleteScene() {
    this.sceneService.deleteScene(this.scene.id);
  }
}
