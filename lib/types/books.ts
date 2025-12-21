export type Tag = {
    tag: string,
    tagSlug: string,
    category: string,
    categorySlug: string,
    spoilerRatio: number,
    count: number
}

export type Tags = Tag[]

export type Book = {
    id: number;
    title: string;
    slug: string;
    rating: number;
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