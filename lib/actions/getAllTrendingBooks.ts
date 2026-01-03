import { getClient } from "../queries/apollo-setup";
import { Book, BooksData, BooksTrendingData } from "../types/books";
import GET_TRENDING_BOOKS from "@/lib/queries/books/getTrendingBooks.graphql";
import getAllBooksById from "./getAllBooksById";

type GetAllTrendingBooks = {
    limit?: number
}

export default async function getAllTrendingBooks({ limit }: GetAllTrendingBooks = { limit: 10 }){
    const { data } = await getClient().query<BooksTrendingData>({ query: GET_TRENDING_BOOKS, variables: {
        limit
    } });

    if(!data || data === undefined) return null
    
    const books = await getAllBooksById(data.books_trending.ids)
  
    const dedupedListing = new Map<string, Book>()
    books.filter((book): book is BooksData => book !== undefined).forEach(({books_by_pk: book}) => {
        if(book && !dedupedListing.has(book.id.toString())){
            dedupedListing.set(book.id.toString(), book)
        }
    })
  
    return dedupedListing
}