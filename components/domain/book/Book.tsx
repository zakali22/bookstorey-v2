"use client"

import { Book as BookType } from "@/lib/types/books";
import Image from "next/image";
import Link from "next/link";


export default function Book(bookData: BookType){
    console.log("Book Props =>", bookData)
    return (
        <Link href={`/books/${bookData.slug}`} className="flex text-black dark:text-white">
            <div className="h-[214px] w-[142px]">
                <Image className="max-w-fit" src={bookData.image?.url || "https://assets.hardcover.app/static/covers/cover7.webp"} alt="" width={142} height={214} loading="lazy" />
            </div>
            <div>
                {bookData.rating && <div>{bookData.rating.toFixed(1)}</div>}
                <h2 className="max-w-max pr-6">{bookData.title}</h2>
                <h3>{bookData.contributions[0]?.author.name}</h3>
                <div>
                    {Array.isArray(bookData.cached_tags) && bookData.cached_tags.slice(0, 3).map((tag) => (
                        <p key={tag.tagSlug}>{tag.tag}</p> 
                    ))}
                </div>
            </div>
        </Link>
    )
}