import { Component, OnInit } from '@angular/core';

import { SceneService } from '../scene/scene.service';

@Component({
  selector: 'seeya-add-scene',
  templateUrl: './add-scene.component.html',
  styleUrls: ['./add-scene.component.css']
})
export class AddSceneComponent implements OnInit {

  constructor(private sceneService: SceneService) {
    this.resetInputValues();
  }

  ngOnInit() {
  }

  addScene(): void {
    this.sceneService.addScene(
      this.newSceneHeader,
      this.newSceneDescription
    );

    this.resetInputValues();
  }

  inputIsValid(): boolean {
    return this.newSceneHeader != '' && this.newSceneDescription != '';
  }

  private resetInputValues(): void {
    this.newSceneHeader = '';
    this.newSceneDescription = '';
  }

  newSceneHeader: string;
  newSceneDescription: string;
}
