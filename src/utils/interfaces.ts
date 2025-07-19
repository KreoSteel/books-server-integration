export interface Book {
    id: number;
    title: string;
    authorId: number;
    categoryId: number;
    languageId: number;
    price: number;
    description: string;
    publishedYear: number;
    pages: number;
    rating: number;
}

export interface Author {
    id: number;
    name: string;
    bio: string;
    birthYear: number;
    deathYear: number;
    nationality: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface Language {
    id: number;
    name: string;
    nativeName: string;
    isoCode: string;
    region: string;
}