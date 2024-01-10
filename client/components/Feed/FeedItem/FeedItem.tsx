import { Feed } from '../types';
import {
  BrandLogo,
  FeedWrapper,
  FeedHeader,
  FeedImage,
  FeedTitle,
  JoinLink,
  FeedImageWrapper,
} from './FeedItem.style';

interface FeedProps {
  data: Feed;
}

export const FeedItem = ({ data }: FeedProps) => {
  return (
    <FeedWrapper>
      <FeedHeader>
        <BrandLogo src={data.brand.logo} alt={data.brand.name} />
        <span>{data.brand.name}</span>
        <JoinLink href="/">Join Brief Now</JoinLink>
      </FeedHeader>
      <FeedImageWrapper>
        <FeedImage src={data.banner_image} alt="Feed Banner" />
        <FeedTitle>{data.feed_title}</FeedTitle>
      </FeedImageWrapper>
    </FeedWrapper>
  );
};
