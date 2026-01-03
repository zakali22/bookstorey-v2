import SearchResult from "@/components/domain/search/SearchResult";
import { getClient } from "@/lib/queries/apollo-setup";
import SEARCH_BY_BOOKS from "@/lib/queries/search/searchByBooks.graphql";
import { Search as SearchType } from "@/lib/types/search";

const PER_PAGE = 30;

export default async function Search({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }){
    const searchQuery  = (await searchParams)
    const currentPageNum = searchQuery.p

    console.log("Search filters => ", searchQuery.q, currentPageNum)

    const { data } = await getClient().query<{ search: SearchType }>({ query: SEARCH_BY_BOOKS, variables: {
        title: searchQuery.q,
        limit: PER_PAGE,
        page: currentPageNum ? currentPageNum : 1
    }});

    const results = data?.search.results.hits
    if(!results) return <p>Loading...</p>

    const resultCount = data?.search.results.found
    const numberOfPages = resultCount / PER_PAGE    

    console.log("Search results count => ", resultCount)
    console.log("Search results => ", results)
    console.log("Number of pages => ", Math.floor(numberOfPages))

    return (
        <>
            {/* TODO: Implement search bar - updates the query and refreshes the page */}
            <SearchResult results={results} numberOfPages={numberOfPages} queryTerm={searchQuery.q} currentPageNum={parseInt(currentPageNum)} />
        </>
    )
}