import Book from "@/components/domain/book/Book";
import { getClient } from "@/lib/queries/apollo-setup";
import GET_BOOKS_BY_MOOD from "@/lib/queries/books/getBooksByMood.graphql";
import { Book as BookType } from "@/lib/types/books";
import { MoodsData } from "@/lib/types/moods";

export default async function Mood({ params }: { params: Promise<{ moodId: string }> }){
    const { moodId } = await params
    const { data } = await getClient().query<MoodsData>({ query: GET_BOOKS_BY_MOOD, variables: {
        mood: moodId, 
        limit: 100,
        offset: 0
    } });


    // console.log("Book data ", data?.taggable_counts)

    const dedupedListing = new Map<string, BookType>()
    data?.taggable_counts.forEach(({book}) => {
        if(book && !dedupedListing.has(book.id.toString())){
            dedupedListing.set(book.id.toString(), book)
        }
    })

    console.log("Deduped => ", Array.from(dedupedListing))

    return (
        <div>
            {Array.from(dedupedListing).map((book) => (
                <Book {...book[1]} key={parseInt(book[0])} />
            ))}
        </div>
    )
}