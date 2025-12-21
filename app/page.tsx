import Book from "@/components/domain/book/Book";
import { getClient } from "@/lib/queries/apollo-setup"
import { GET_TRENDING_BOOKS } from "@/lib/queries/books";

export default async function Home() {
  const { data } = await getClient().query({ query: GET_TRENDING_BOOKS });

  return (
    <div className="grid grid-cols-10 min-h-screen items-start justify-start dark:bg-white">
        { data?.books_trending.ids.map((bookId) => (
          <Book bookId={bookId} key={bookId} />
        )) }
    </div>
  );
}