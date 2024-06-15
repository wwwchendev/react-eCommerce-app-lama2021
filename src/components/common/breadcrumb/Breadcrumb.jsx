import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowRight } from '@material-ui/icons';

const Container = styled.nav`
margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  ol {
    display: flex;
    align-items: center;    
    width: 100%;
    list-style: none;
    padding: 0;
    li {
      padding: 0 4px 0 0;
    }
    a {
      text-decoration: none;
      color: #666;
      white-space: nowrap;
      &:hover {
        color: #8f2d14;
      }
    }
  }

`;

export const Breadcrumb = ({ paths }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    // Set breadcrumbs data here
    const breadcrumbData = [
      { label: '首頁', path: '/' },
      { label: '關於', path: '/about' },
    ];
    setBreadcrumbs(paths ? paths : breadcrumbData);
  }, [paths]);

  return (
    <Container>
      <ol>
        {breadcrumbs.map((breadcrumb, index) => {
          if (index === breadcrumbs.length - 1) {
            return (
              <li key={index}>
                <span>{breadcrumb.label}</span>
              </li>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <li>
                  <a href={breadcrumb.path}>{breadcrumb.label}</a>
                </li>
                <ArrowRight />
              </React.Fragment>
            );
          }
        })}
      </ol>
    </Container>
  );
};
