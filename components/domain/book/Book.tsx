import { Book as BookType } from "@/lib/types/books";
import Image from "next/image";
import Link from "next/link";


export default async function Book(bookData: BookType){
    console.log("Book Props =>", bookData)
    return (
        <Link href={`/books/${bookData.slug}`} className="flex text-black dark:text-white">
            <div className="h-[214px] w-[142px]">
                <Image className="max-w-fit" src={bookData.image.url || "/fallback-image.jpg"} alt="" width={142} height={214} loading="lazy" />
            </div>
            <div>
                {bookData.rating && <div>{bookData.rating.toFixed(1)}</div>}
                <h2 className="max-w-max pr-6">{bookData.title}</h2>
                <h3>{bookData.contributions[0]?.author.name}</h3>
                { bookData.cached_tags && (
                    <div>
                        <p>{bookData.cached_tags[0].tag}</p> 
                        <p>{bookData.cached_tags[1].tag}</p> 
                    </div>
                )}
            </div>
        </Link>
    )
}