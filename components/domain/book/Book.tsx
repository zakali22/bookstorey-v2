import { getClient } from "@/lib/queries/apollo-setup";
import { GET_BOOK } from "@/lib/queries/books";
import { Tag, Tags } from "@/lib/types/books";
import Image from "next/image";

interface IBookProps {
    bookId: number
}

export default async function Book({ bookId }: IBookProps){
    const { data } = await getClient().query({ query: GET_BOOK, variables: {
        id: bookId
    } });

    console.log("GetBook =>", data)

    function renderCategories(tags: Tag[]){/** TODO: Display multiple categories/genres */
    }

    return (
        <div className="flex text-black">
            <div className="h-[214px] w-[142px]">
                <Image className="max-w-fit" src={data?.books_by_pk.image.url || "/fallback-image.jpg"} alt="" width={142} height={214} loading="lazy" />
            </div>
            <div>
                <div>{data?.books_by_pk.rating.toFixed(1)}</div>
                <h2 className="max-w-max pr-6">{data?.books_by_pk.title}</h2>
                <h3>{data?.books_by_pk.contributions[0]?.author.name}</h3>
                <p>{data?.books_by_pk.cached_tags[0].tag}</p>
            </div>
        </div>
    )
}