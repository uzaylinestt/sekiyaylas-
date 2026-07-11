import type { LocalizedString } from './room';

export interface ActivityPrice {
    amount: number;
    currency: string;
    per: string;
}

export interface Activity {
    slug: string;
    category: LocalizedString;
    name: LocalizedString;
    shortDesc: LocalizedString;
    description: LocalizedString;
    duration: LocalizedString;
    price: ActivityPrice;
    schedule: LocalizedString;
    capacity: number;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
    image: string;
    includes: LocalizedString;
}

export interface ActivityCategories {
    az: string[];
    en: string[];
}

export interface ActivitiesData {
    categories: ActivityCategories;
    items: Activity[];
}
