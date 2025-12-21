import { Book } from "@/lib/types/books";
import { gql, TypedDocumentNode } from "@apollo/client";

export const GET_BOOK: TypedDocumentNode<{ books_by_pk: Book }> = gql`
    query GetBook($id: Int!) {
        books_by_pk(id: $id) {
            id
            title
            slug
            rating
            release_year
            release_date
            subtitle
            pages
            description
            cached_tags(path: "Genre")
            image {
                url
            }
            contributions {
                author {
                    name
                    slug
                }
            }
        }
    }
`;