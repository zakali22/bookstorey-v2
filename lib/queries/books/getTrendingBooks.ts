import { gql, TypedDocumentNode } from "@apollo/client";

export const GET_TRENDING_BOOKS: TypedDocumentNode<{ books_trending: { ids: number[] } }> = gql`
  query GetTrendingBooks {
    books_trending(from: "2025-01-01", limit: 10, offset: 10, to: "2025-06-01") {
      ids
    }
  }
`;