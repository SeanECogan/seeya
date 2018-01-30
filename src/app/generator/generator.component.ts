import { Component, OnInit } from '@angular/core';

import { SceneService } from './scene/scene.service';

import { SceneModel } from '../shared/models/scene-model';

@Component({
  selector: 'seeya-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  scenes: SceneModel[];

  constructor(private sceneService: SceneService) {
  }

  ngOnInit() {
    this.getScenes();
  }

  getScenes(): void {
    this.scenes = this.sceneService.getScenes();
  }
}
