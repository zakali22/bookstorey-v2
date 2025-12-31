import { Book } from "./books"

export type CategoriesData = {
    taggable_counts: {
        book: Book
    }[]
}