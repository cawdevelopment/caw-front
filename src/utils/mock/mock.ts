import { sub } from 'date-fns';
import { boolean } from './boolean';
import { firstName, lastName, fullName } from './name';
import { title, sentence, description } from './text';
import { price, rating, age, percent } from './number';

const _mock = {
  id: (index: number) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  boolean: (index: number) => boolean[ index ],
  name: {
    firstName: (index: number) => firstName[ index ],
    lastName: (index: number) => lastName[ index ],
    fullName: (index: number) => fullName[ index ],
    userName: (index: number) => fullName[ index ].replace(/\s/g, '').toLowerCase(),
  },
  text: {
    title: (index: number) => title[ index ],
    sentence: (index: number) => sentence[ index ],
    description: (index: number) => description[ index ],
  },
  number: {
    percent: (index: number) => percent[ index ],
    rating: (index: number) => rating[ index ],
    age: (index: number) => age[ index ],
    price: (index: number) => price[ index ],
  },
  image: {
    cover: (index: number) =>
      `https://picsum.photos/seed/${index}/600/400`,
    feed: (index: number) =>
      `https://picsum.photos/seed/${index}/600/400`,
    product: (index: number) =>
      `https://picsum.photos/seed/${index}/600/400`,
    avatar: (index: number) =>
      index === 0 ? 'https://pbs.twimg.com/profile_images/1529794585362407424/npkH5ILQ_400x400.jpg' : `https://picsum.photos/seed/${index}/600/400`,
  },
};

export default _mock;
