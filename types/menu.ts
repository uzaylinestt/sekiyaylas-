import type { LocalizedString } from './room';

export interface MenuItemPrice {
    amount: number;
    currency: string;
}

export interface MenuItem {
    slug: string;
    category: LocalizedString;
    name: LocalizedString;
    description: LocalizedString;
    price: MenuItemPrice;
    tags: string[];
    image: string;
}

export interface MenuCategories {
    az: string[];
    en: string[];
}

export interface Menu {
    categories: MenuCategories;
    items: MenuItem[];
}
