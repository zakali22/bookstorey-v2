import categoriesMap from "@/lib/actions/getAllCategories"

type CategoriesListingProps = {
    sort?: 'asc' | 'desc',
    limit?: number
}

export default function CategoriesListing({ sort = 'desc', limit = 10 }: CategoriesListingProps){

    const remappedCategories = () => {
        return Array.from(categoriesMap)
            .sort((a, b) => {
                if(sort === 'desc'){
                    return b[1].count - a[1].count
                }
                return a[1].count - b[1].count
            })
            .slice(0, limit)
    }

    return (
        <div>
            <h2>Categories</h2>
            {remappedCategories().map((category, index) => (
                <p key={index}>{category[0]}</p>
            ))}
        </div>
    )
}