import { Book } from "./books"

export type MoodTag = {
    tag: string;
    slug: string;
    count: number
}

export type MoodsData = {
    taggable_counts: {
        book: Book
    }[]
}