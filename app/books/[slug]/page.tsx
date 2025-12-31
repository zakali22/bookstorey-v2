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

    console.log("Books page => ", data)

    // Format date on server to avoid hydration mismatch
    const releaseYear = data?.books[0].release_year
        ? new Date(data.books[0].release_year).getFullYear()
        : null;

    return (
        <div>
            <div className="h-[214px] w-[142px]">
                <Image className="max-w-fit" src={data?.books[0].image.url || "/fallback-image.jpg"} alt="" width={142} height={214} loading="lazy" />
            </div>
            <div className="">
                <h2>{data?.books[0].title}</h2>
                <h3>{data?.books[0].subtitle}</h3>
                <h3>By {data?.books[0].contributions[0]?.author.name}</h3>
                {data?.books[0].rating && <div>{data?.books[0].rating.toFixed(1)}</div>}
                <div>
                    <p>{releaseYear}</p>
                    <p>{data?.books[0].pages} pages</p>
                </div>
                { data?.books[0].cached_tags && (
                    data?.books[0].cached_tags.slice(0, 4).map((tag) => (
                        <Link href={`/categories/${tag.tagSlug}`} key={tag.tagSlug}>
                            <p>{tag.tag}</p>
                        </Link>
                    ))
                )}
                <p>{data?.books[0].description}</p>
            </div>
        </div>
    )
}