import { BaseEntity } from "../core/base-entity.model";

export class Category extends BaseEntity {
  public id!: number;
  public documentId!: string;
  public name!: string;
  public isActive?: string;
  public description?: string;
}