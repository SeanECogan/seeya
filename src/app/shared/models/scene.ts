import { Link } from "./link";

export class Scene {
  /**
   * Generates a new Scene object, which represents a scene of the adventure.
   */
  constructor(
    id: number,
    header: string,
    description: string,
    link: Link
  ) {
    this.id = id;
    this.header = header;
    this.description = description;
    this.link = link;
  }

  id: number;
  header: string;
  description: string;
  link: Link;
}
