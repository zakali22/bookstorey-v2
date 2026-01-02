import moodsMap from "@/lib/actions/getAllMoods";
import Link from "next/link";

export default async function Categories(){
    console.log(Array.from(moodsMap))
    return (
        <div>
            {
                Array.from(moodsMap).map((tag, index) => {
                  return  <div key={index}>
                        <Link href={`/moods/${tag[1].slug}`}>
                            <h2>{tag[0]} ({tag[1].count} books)</h2>
                        </Link>
                    </div>
                })
            }
        </div>
    )
}