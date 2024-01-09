import { useFeed } from '../../../hooks/useFeed';

export const FeedList = () => {
  const { feeds, isLoading } = useFeed();

  console.log('feeds:', feeds);
  return <div>FeedList</div>;
};
