import Book from "@/components/domain/book/Book";
import { getClient } from "@/lib/queries/apollo-setup";
import GET_BOOK_BY_IDS_BY_CATEGORY from "@/lib/queries/books/getBooksByCategory.graphql";
import { Book as BookType } from "@/lib/types/books";
import { CategoriesData } from "@/lib/types/categories";

export default async function Category({ params }: { params: Promise<{ categoryId: string }> }){
    const { categoryId } = await params
    const { data } = await getClient().query<CategoriesData>({ query: GET_BOOK_BY_IDS_BY_CATEGORY, variables: {
        category: categoryId, 
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