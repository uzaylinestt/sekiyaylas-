export interface PriceRange {
    min: number;
    max: number;
    currency: string;
}

export interface LocalizedString {
    az: string;
    en: string;
}

export interface Room {
    slug: string;
    name: LocalizedString;
    shortDesc: LocalizedString;
    description: LocalizedString;
    priceRange: PriceRange;
    size: string;
    capacity: number;
    features: string[];
    images: string[];
}
