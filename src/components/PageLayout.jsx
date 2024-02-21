import styled from 'styled-components';
import { Navbar } from './Navbar';

const Content = styled.main`
  padding-top: 60px;
`;

export const PageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Content>{children}</Content>
    </>
  );
};
