import { ReactNode, createContext, useEffect, useState } from 'react';
import { Feed } from '../components/Feed/types';
import { useInView } from '../hooks/useInView';

export const FeedContext = createContext({
  feeds: [] as Feed[],
  isLoading: false,
  fetchFeeds: () => {},
  sentinelRef: (node?: Element | null | undefined) => {},
});

export const FeedProvider = ({ children }: { children: ReactNode }) => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreFeeds, setHasMoreFeeds] = useState(true);

  const { ref, inView } = useInView();

  const fetchFeeds = async () => {
    if (isLoading || !hasMoreFeeds) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/feeds?page=${pageNumber}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newFeeds = await response.json();
      setFeeds((currentFeeds) => [...currentFeeds, ...newFeeds]);
      setPageNumber((currentPage) => currentPage + 1);
      setHasMoreFeeds(newFeeds.length >= 5);
    } catch (error) {
      console.error('Error fetching feeds:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchFeeds();
    }
  }, [inView]);

  return (
    <FeedContext.Provider
      value={{
        feeds,
        isLoading,
        fetchFeeds,
        sentinelRef: ref,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};
