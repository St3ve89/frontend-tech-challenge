import styled from 'styled-components';

export const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    width: 40%;
  }
`;

export const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const BrandLogo = styled.img`
  height: 40px;
`;

export const JoinLink = styled.a`
  color: blue;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    text-decoration: underline;
  }
`;

export const FeedImageWrapper = styled.div`
  display: flex;
`;

export const FeedImage = styled.img`
  width: 100%;
  flex: 1;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

export const FeedTitle = styled.h2`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 1.5em;
  }
`;
