import { getClient } from "@/lib/queries/apollo-setup";
import GET_BOOKS_BY_CATEGORY from "@/lib/queries/books/getBooksByCategory.graphql";

export default async function Category({ params }: { params: Promise<{ categoryId: string }> }){
    const { categoryId } = await params
    const { data } = await getClient().query({ query: GET_BOOKS_BY_CATEGORY, variables: {
        category: categoryId
    } });


    console.log("Book data ", data)

    return <h1>Category page</h1>
}