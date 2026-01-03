import { MoodTag } from "./moods";

export type Tag = {
    tag: string,
    tagSlug: string,
    category: string,
    categorySlug: string,
    spoilerRatio: number,
    count: number
}

export type Tags = {
    Genre: Tag[];
    Mood: MoodTag[]
}

export type Book = {
    id: number;
    title: string;
    slug: string;
    rating: number;
    ratings_count: number;
    users_read_count: number;
    release_year: Date
    release_date: Date;
    subtitle: string;
    pages: number;
    description: string;
    cached_tags: Tags
    image: {
        url: string;
    };
    contributions: {
        author: {
            name: string
            slug: string
        }
    }[]
}

export type BooksData = {
    books_by_pk: Book
}

export type BooksTrendingData = {
    books_trending: {
      ids: number[];
    };
}