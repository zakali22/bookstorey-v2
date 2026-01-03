import Book from "@/components/domain/book/Book";
import getAllTrendingBooks from "@/lib/actions/getAllTrendingBooks";

export default async function Popular() {
  const trendingBooks = await getAllTrendingBooks({ limit: 100 })

  return (
    <>
    <div className="grid grid-cols-10 min-h-screen items-start justify-start space-x-4">
      {trendingBooks && Array.from(trendingBooks).map((book) => (
          <Book {...book[1]} key={parseInt(book[0])} />
      ))}
    </div>
    </>
  );
}