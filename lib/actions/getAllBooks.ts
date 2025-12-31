import { getClient } from "@/lib/queries/apollo-setup";
import GET_BOOK_BY_ID from "@/lib/queries/books/getBookById.graphql";
import { Book as BookType } from "@/lib/types/books";

export default async function getAllBooksById(bookIds: number[]){
    let delay = -1000;
    const delayIncrement = 1000;
    
    const promises = bookIds.map(async (bookId) => {
        delay += delayIncrement;
    
        return new Promise((resolve) =>
            setTimeout(resolve, delay))
            .then(async () => {
                const { data } = await getClient().query<{ books_by_pk: BookType }>({ query: GET_BOOK_BY_ID, variables: {
                    id: bookId
                } });

                return data
            })
    })

    
    const allBooksData = await Promise.all(promises)

    console.log("allBooksData ", allBooksData)
    return allBooksData
}