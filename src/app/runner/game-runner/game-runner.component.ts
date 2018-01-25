import { Component, OnInit } from '@angular/core';

import { SceneService } from '../scene/scene.service';

import { SceneModel } from '../../shared/models/scene-model';

@Component({
  selector: 'seeya-game-runner',
  templateUrl: './game-runner.component.html',
  styleUrls: ['./game-runner.component.css']
})
export class GameRunnerComponent implements OnInit {

  constructor(private sceneService: SceneService) { }

  ngOnInit() {
  }

  loadNextScene(toSceneId: number): void {
    this.sceneService.loadNextScene(toSceneId);
  }

  restartGame(): void {
    this.sceneService.startGame();
  }

  get currentScene(): SceneModel {
    return this.sceneService.getCurrentScene();
  }
}
