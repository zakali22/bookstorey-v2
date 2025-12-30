import { getClient } from "@/lib/queries/apollo-setup";
import GET_CATEGORY from "@/lib/queries/categories/getCategory.graphql";

export const getAllCategoriesTag = () => ([
  { category: 'Art' },
  { category: 'Biography' },
  { category: 'Computers' },
  { category: 'Education' },
  { category: 'History' },
  { category: 'Fiction' },
  { category: 'Science fiction' },
  { category: 'Languages' },
  { category: 'Mathematics' },
  { category: 'Medicine' },
  { category: 'Politics' },
  { category: 'Psychology' },
  { category: 'Religion' },
  { category: 'Islam' },
  { category: 'Christianity' },
  { category: 'Judaism' },
  { category: 'Hinduism' },
  { category: 'Buddhism' },
  { category: 'Science' },
  { category: 'Social Science' },
  { category: 'Engineering' },
  { category: 'Civil Engineering' },
  { category: 'Chemical Engineering' },
  { category: 'Mechanical Engineering' },
  { category: 'Electrical Engineering' },
  { category: 'Computer Engineering' },
  { category: 'Travel' },
])

const categories = getAllCategoriesTag()

const allTagsData = await Promise.all(
    categories.map(async ({category}) => {
        const {data} = await getClient().query({ query: GET_CATEGORY, variables: {
            category
        }});
        return data
    })
)

const remappedTagsData = allTagsData
    .filter((data): data is { tags: { tag: string; slug: string; count: number; }[] } => data !== undefined)
    .map((tags) => {
        const tagsArr = tags.tags
        if(tagsArr.length > 1){
            return [...tagsArr].sort((a, b) => b.count - a.count)
        }
        return tagsArr
    })
    .flat()

const mapTagsData = new Map<string, { count: number, slug: string }>()
remappedTagsData.forEach((tag) => {
    if(!mapTagsData.has(tag.tag)){
        mapTagsData.set(tag.tag, {count: tag.count, slug: tag.slug.split('-')[0]})
    }
})

export default mapTagsData