import Book from "@/components/domain/book/Book";
import CategoriesListing from "@/components/domain/category/CategoriesListing";
import { getClient } from "@/lib/queries/apollo-setup"
import GET_TRENDING_BOOKS from "@/lib/queries/books/getTrendingBooks.graphql";
import { BooksTrendingData } from "@/lib/types/books";

export default async function Home() {
  const { data } = await getClient().query<BooksTrendingData>({ query: GET_TRENDING_BOOKS });

  return (
    <>
    <div className="grid grid-cols-10 min-h-screen items-start justify-start space-x-4">
        { data?.books_trending.ids.map((bookId: number) => (
          <Book bookId={bookId} key={bookId} />
        ))}
    </div>
    <div>
      <CategoriesListing />
    </div>
    </>
  );
}