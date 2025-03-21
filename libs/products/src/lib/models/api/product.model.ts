import { BaseEntity } from "../core/base-entity.model";
import { Category } from "./category.model";
import { Image } from "./image.model";

export class Product extends BaseEntity {
  public id!: number;
  public documentId!: string;
  public name!: string;
  public description?: string;
  public images?: Image[];
  public price?: number;
  public priceDiscounted?: number;
  public isActive!: boolean;
  public category?: Category;
  public stock!: number;
  public additionalInfo!: string;
}
