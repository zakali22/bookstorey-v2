"use client"

import { SearchHit } from "@/lib/types/search";
import Book from "@/components/domain/book/Book";
import Link from 'next/link';

type SearchResultProps = { 
    results: SearchHit[];
    numberOfPages: number;
    queryTerm: string;
    currentPageNum: number
}

export default function SearchResult({ results, numberOfPages, queryTerm, currentPageNum }: SearchResultProps){
    return (
        <>
            <div className="grid grid-cols-10 min-h-screen items-start justify-start space-x-4">
                {results && results.map(({ document }) => (
                    <Book {...document} key={document.id} />
                ))} 
            </div>
            {/* TODO: Implement pagination */}
            <div className="my-5 flex content-center justify-center gap-4">
                { Array.from({ length: numberOfPages }).map((u, index) => (
                    <Link href={`/search?q=${queryTerm}&p=${index+1}`} className={`outline outline-black p-1.5 hover:dark:bg-white hover:bg-black hover:dark:text-black hover:text-white dark:outline-white cursor-pointer ${currentPageNum === index+1 ? 'dark:bg-white bg-black dark:text-black text-white' : ''}`} key={index+1}>{index+1}</Link>
                )) }
            </div>
        </>
    )
}