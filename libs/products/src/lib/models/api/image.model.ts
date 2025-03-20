import { BaseEntity } from "../core/base-entity.model";

export class Image extends BaseEntity {
  id!: number;
  documentId!: string
  name!: string;
  alternativeText!: string;
  caption!: string;
  width!: number;
  height!: number;
  formats!: {
    thumbnail: Media;
    large: Media;
    medium: Media;
    small: Media
  };
  hash!: string;
  ext!: string;
  mime!: string;
  size!: number;
  url!: string;
  previewUrl!: string;
  provider!: string;
  provider_metadata!: string;
}

class Media {
  name!: string;
  width!: number;
  height!: number;
  hash!: string;
  ext!: string;
  mime!: string;
  size!: number;
  sizeInBytes!: number;
  url!: string;
  path?: string;
}