import { LinkModel } from './link-model';

export class SceneModel {
  /**
   * Generates a new SceneModel object, which represents a scene of the adventure.
   */
  constructor(
    id: number,
    header: string,
    description: string,
    link: LinkModel
  ) {
    this.id = id;
    this.header = header;
    this.description = description;
    this.link = link;
  }

  id: number;
  header: string;
  description: string;
  link: LinkModel;
}
