import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia, MediaService } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { SceneService } from './scene/scene.service';

import { SceneModel } from '../shared/models/scene-model';

@Component({
  selector: 'seeya-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  public columns: Number;
  private subscription: Subscription;

  constructor(
    private sceneService: SceneService,
    private _media$: ObservableMedia,
    private mediaService: MediaService
  ) {
    this.subscription = this._media$.subscribe((e: MediaChange) => {
      this.updateColumns();
    });
  }

  ngOnInit() {
    this.updateColumns();
    this.getScenes();
  }

  getScenes(): SceneModel[] {
    return this.sceneService.getScenes();
  }

  private updateColumns() {
    const isSmall = this.mediaService.isActive('lt-md');
    this.columns = isSmall ? 1 : 2;
  }
}
