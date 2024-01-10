import { useEffect, useState } from 'react';
import { useFeed } from '../../../hooks/useFeed';
import { FeedItem } from '../FeedItem';
import { FeedListWrapper, FeedLoadMore } from './FeedList.style';

export const FeedList = () => {
  const { feeds, isLoading, sentinelRef } = useFeed();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    if (feeds.length > 0) {
      setInitialLoadComplete(true);
    }
  }, [feeds.length]);

  return (
    <>
      <FeedListWrapper>
        {feeds.map((feed, idx) => (
          <FeedItem data={feed} key={`${feed.briefref}_${idx}`} />
        ))}
      </FeedListWrapper>
      {initialLoadComplete && (
        <FeedLoadMore ref={sentinelRef}>
          {isLoading && <p>loading more feeds...</p>}
        </FeedLoadMore>
      )}
    </>
  );
};
