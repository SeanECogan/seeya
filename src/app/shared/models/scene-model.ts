import { LinkModel } from './link-model';
import { FlagModel } from './flag-model';

export class SceneModel {
  /**
   * Generates a new SceneModel object, which represents a scene of the adventure.
   */
  constructor(
    id: number,
    header: string,
    description: string,
    imageUrl: string,
    links: LinkModel[],
    flags: FlagModel[]
  ) {
    this.id = id;
    this.header = header;
    this.description = description;
    this.imageUrl = imageUrl;
    this.links = links;
    this.flags = flags;
  }

  id: number;
  header: string;
  description: string;
  imageUrl: string;
  links: LinkModel[];
  flags: FlagModel[];
}
