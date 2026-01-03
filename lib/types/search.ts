import { Book } from "./books";

export type SearchHit = {
    document: Book
}

export type Search = {
    results: {
        found: number;
        hits: SearchHit[]
    }
}