import { useEffect, useState } from 'react';
//components
import styled from 'styled-components'
import { md, sm } from '@/components/layout/responsive';
import { ProductCard } from '@/components/common';

const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.$viewMode === 'grid' ? 'repeat(4, 1fr)' : '1fr')};
  gap: 2rem 1.5rem;

  ${md({
  gridTemplateColumns: (props) => (props.$viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr'),
})}
  ${sm({
  gridTemplateColumns: (props) => (props.$viewMode === 'grid' ? 'repeat(2, 1fr)' : '1fr'),
  gap: '2rem 0.8rem',
})}
`;

const ProductCards = ({ $viewMode, products }) => {
  const [data, setData] = useState(products);

  useEffect(() => {
    setData(products);
  }, [products]);

  return (
    <ProductsWrapper $viewMode={$viewMode}>
      {
        data.map((product) => (
          <ProductCard product={product} key={product.productNumber} $viewMode={$viewMode} />
        ))
      }
    </ProductsWrapper>
  );
};

export default ProductCards;
