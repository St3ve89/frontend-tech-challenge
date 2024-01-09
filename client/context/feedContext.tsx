import { ReactNode, createContext, useEffect, useState } from 'react';
import { Feed } from '../components/Feed/types';

export const FeedContext = createContext({
  feeds: [] as Feed[],
  isLoading: false,
});

export const FeedProvider = ({ children }: { children: ReactNode }) => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeeds = async (pageNumber = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/feeds?page=${pageNumber}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFeeds(data);
    } catch (error) {
      console.error('Error fetching feeds:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <FeedContext.Provider value={{ feeds, isLoading }}>
      {children}
    </FeedContext.Provider>
  );
};
