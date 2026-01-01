import { Book } from "./books"

export type Author = {
    name: string,
    id: number,
    image: {
      url: string
    },
    death_year: Date,
    born_year: Date,
    bio: string,
    books_count: number,
    contributions: { book: Book }[]
}