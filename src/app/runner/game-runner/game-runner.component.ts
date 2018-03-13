import { Component, OnInit } from '@angular/core';

import { SceneService } from '../scene/scene.service';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';

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
    this.sceneService.setFlagsForScene(toSceneId);
  }

  restartGame(): void {
    this.sceneService.startGame();
  }

  visibleLinks(): LinkModel[] {
    return this.currentScene.links.filter(link => {
      return this.linkIsVisible(link);
    });
  }

  linkIsVisible(link: LinkModel): boolean {
    return this.sceneService.allFlagsSetForLink(link);
  }

  get currentScene(): SceneModel {
    return this.sceneService.getCurrentScene();
  }
}
