import { gql, TypedDocumentNode } from "@apollo/client";

export const GET_CATEGORY: TypedDocumentNode<{ tags: { tag: string, slug: string, count: number }[] }> = gql`
  query GetCategory($category: String!) {
    tags(where: {tag: {_eq: $category}}) {
      tag
      slug
      count
    }
  }
`;