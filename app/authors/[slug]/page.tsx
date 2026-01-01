import Book from "@/components/domain/book/Book";
import { getClient } from "@/lib/queries/apollo-setup";
import GET_AUTHOR_BY_SLUG from "@/lib/queries/authors/getAuthorBySlug.graphql";
import { Author as AuthorType } from "@/lib/types/authors";
import Image from "next/image";
import Link from "next/link";

export default async function Author({ params }: { params: Promise<{ slug: string }> }){
    const { slug } = await params
    const { data } = await getClient().query<{ authors: AuthorType[] }>({ query: GET_AUTHOR_BY_SLUG, variables: {
        slug
    }});
    const author = data?.authors[0]

    console.log("Authors page => ", author)


    // Format date on server to avoid hydration mismatch
    const bornYear = author?.born_year
        ? new Date(author?.born_year).getFullYear()
        : null;

    const deathYear = author?.death_year
        ? new Date(author?.death_year).getFullYear()
        : null;

    const authorContributions = author?.contributions.map(({ book }) => (
        <Book {...book} key={book.id} />
    ))

    return (
        <div>
            <div className="h-[214px] w-[142px]">
                <Image className="max-w-fit" src={author?.image.url || "/fallback-image.jpg"} alt="" width={142} height={214} loading="lazy" />
            </div>
            <div className="">
                <h2>{author?.name}</h2>
                <h3>{author?.bio}</h3>
                <div>
                    <p>{bornYear}</p>
                    {deathYear && <p>{deathYear} pages</p>}
                </div>
                <h3>{author?.books_count} books written</h3>
                {authorContributions}
            </div>
        </div>
    )
}