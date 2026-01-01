import { getClient } from "@/lib/queries/apollo-setup";
import GET_BOOK_BY_SLUG from "@/lib/queries/books/getBookBySlug.graphql";
import { Book as BookType } from "@/lib/types/books";
import Image from "next/image";
import Link from "next/link";

export default async function Book({ params }: { params: Promise<{ slug: string }> }){
    const { slug } = await params
    const { data } = await getClient().query<{ books: BookType[] }>({ query: GET_BOOK_BY_SLUG, variables: {
        slug
    }});
    const book = data?.books[0]

    console.log("Books page => ", book)


    // Format date on server to avoid hydration mismatch
    const releaseYear = book?.release_year
        ? new Date(book?.release_year).getFullYear()
        : null;

    return (
        <div>
            <div className="h-[214px] w-[142px]">
                <Image className="max-w-fit" src={book?.image.url || "/fallback-image.jpg"} alt="" width={142} height={214} loading="lazy" />
            </div>
            <div className="">
                <h2>{book?.title}</h2>
                <h3>{book?.subtitle}</h3>
                <h3>By <Link href={`/authors/${book?.contributions[0]?.author.slug}`}>{book?.contributions[0]?.author.name}</Link></h3>
                {book?.rating && <div>{book?.rating.toFixed(1)}</div>}
                <div>
                    <p>{releaseYear}</p>
                    <p>{book?.pages} pages</p>
                </div>
                { book?.cached_tags && (
                    book?.cached_tags.slice(0, 4).map((tag) => (
                        <Link href={`/categories/${tag.tagSlug}`} key={tag.tagSlug}>
                            <p>{tag.tag}</p>
                        </Link>
                    ))
                )}
                <p>{book?.description}</p>
            </div>
        </div>
    )
}