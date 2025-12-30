import categoriesMap from "@/lib/actions/getAllCategories";
import Link from "next/link";

export default async function Categories(){
    return (
        <div>
            {
                Array.from(categoriesMap).map((tag, index) => {
                    {console.log("tag ", tag)}
                  return  <div key={index}>
                        <Link href={`/categories/${tag[1].slug}`}>
                            <h2>{tag[0]} ({tag[1].count} books)</h2>
                        </Link>
                    </div>
                })
            }
        </div>
    )
}