import Book from "@/components/domain/book/Book";
import CategoriesListing from "@/components/domain/category/CategoriesListing";
import getAllBooksById from "@/lib/actions/getAllBooks";
import { getClient } from "@/lib/queries/apollo-setup"
import GET_TRENDING_BOOKS from "@/lib/queries/books/getTrendingBooks.graphql";
import { Book as BookType, BooksData, BooksTrendingData } from "@/lib/types/books";

export default async function Home() {
  const { data } = await getClient().query<BooksTrendingData>({ query: GET_TRENDING_BOOKS });

  if(!data || data === undefined) return <p>Loading...</p>
  
  const books = await getAllBooksById(data.books_trending.ids)

  const dedupedListing = new Map<string, BookType>()
  books.filter((book): book is BooksData => book !== undefined).forEach(({books_by_pk: book}) => {
      if(book && !dedupedListing.has(book.id.toString())){
          dedupedListing.set(book.id.toString(), book)
      }
  })

  console.log("books listing =>", dedupedListing)

  return (
    <>
    <div className="grid grid-cols-10 min-h-screen items-start justify-start space-x-4">
      {Array.from(dedupedListing).map((book) => (
          <Book {...book[1]} key={parseInt(book[0])} />
      ))}
    </div>
    <div>
      <CategoriesListing />
    </div>
    </>
  );
}