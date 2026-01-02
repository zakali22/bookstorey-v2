import { getClient } from "@/lib/queries/apollo-setup";
import GET_CATEGORY from "@/lib/queries/categories/getCategory.graphql";

export const getAllCategoriesTag = () => {
    const categories = [
      'Art',
      'Biography',
      'Computers',
      'Education',
      'History',
      'Fiction',
      'Science fiction',
      'Languages',
      'Mathematics',
      'Medicine',
      'Politics',
      'Psychology',
      'Religion',
      'Islam',
      'Christianity',
      'Judaism',
      'Hinduism',
      'Buddhism',
      'Science',
      'Social Science',
      'Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Mechanical Engineering',
      'Electrical Engineering',
      'Computer Engineering',
      'Travel',
    ];
  
    return categories.map((category) => ({ category }));
};
  

const categories = getAllCategoriesTag()

let delay = -1000;
const delayIncrement = 1000;

const promises = categories.map(async ({category}) => {
    delay += delayIncrement;

    return new Promise((resolve) =>
        setTimeout(resolve, delay))
        .then(async () => {
            const {data} = await getClient().query({ query: GET_CATEGORY, variables: {
                category
            }});
            return data
        })
})

const allTagsData = await Promise.all(promises)

console.log("allTagsData => ", allTagsData)

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
        mapTagsData.set(tag.tag, {count: tag.count, slug: tag.slug})
    }
})

export default mapTagsData