import { useContext } from 'react';
import { FeedContext } from '../context/feedContext';

export const useFeed = () => {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error('useFeeds must be used within a FeedProvider');
  }
  return context;
};
