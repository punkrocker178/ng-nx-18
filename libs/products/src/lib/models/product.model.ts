import { BaseEntity } from "./base-entity.model";

export class Product extends BaseEntity {
    public name!: string;
    public description?: string;
    public images?: any[];
    public price?: number;
    public priceDiscounted?: number;
    public isActive!: boolean;
    public categoryId?: number;
    public stock!: number;
    public additionalInfo!: string;
}