import { getClient } from "@/lib/queries/apollo-setup";
import GET_MOOD from "@/lib/queries/moods/getMood.graphql";
import { MoodTag } from "../types/moods";

export const getAllMoodsTag = () => {
    const moods = [
      'Adventurous',
      'Emotional',
      'Dark',
      'Mysterious',
      'Tense',
      'Reflective',
      'Funny',
      'Lighthearted',
      'Sad',
      'Hopeful',
      'Challenging',
      'Inspiring',
      'Informative',
      'Relaxing',
      'Fast-Paced',
      'Medium-Paced',
      'Slow-Paced',
      'Suspenseful',
      'Exciting',
      'Romantic',
      'Humorous',
      'Scary',
      'Cozy',
      'Fast Paced',
      'Heartfelt',
      'Thought-Provoking',
    ];
  
    return moods.map((mood) => ({ mood }));
};

const moods = getAllMoodsTag()

let delay = -1000;
const delayIncrement = 1000;

const promises = moods.map(async ({mood}) => {
    delay += delayIncrement;

    return new Promise<{ moodSlug: MoodTag[], moodTag: MoodTag[] }>((resolve) =>
        setTimeout(resolve, delay))
        .then(async () => {
            const {data} = await getClient().query({ query: GET_MOOD, variables: {
                moodTag: mood,
                moodSlug: mood.toLowerCase()
            }});
            return data as { moodSlug: MoodTag[], moodTag: MoodTag[] };
        })
})

const allTagsData = await Promise.all(promises).then((results) => {
    return results.reduce((acc, result) => {
        acc.moodSlug.push(...result.moodSlug);
        acc.moodTag.push(...result.moodTag);
        return acc;
    }, { moodSlug: [], moodTag: [] } as { moodSlug: MoodTag[], moodTag: MoodTag[] });
});


const remappedTagsData = [...allTagsData.moodSlug, ...allTagsData.moodTag]

const mapTagsData = new Map<string, { count: number, slug: string }>()
remappedTagsData.forEach((tag) => {
    if(!mapTagsData.has(tag.tag.toLowerCase().split(' ').join('-')) ){
        mapTagsData.set(tag.tag, {count: tag.count, slug: tag.slug})
    }
})

// console.log("mapTagsData => ", mapTagsData)
export default mapTagsData