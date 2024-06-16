import styled from 'styled-components'

const PaginatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 1.5rem 0;
`

const PaginatorButton = styled.button`
  margin: 0 0.25rem;
  padding: 0.5rem 1rem;
  background-color: ${props => (props.$active ? '#c9a388' : '#ffffff')};
  color: ${props => (props.$active ? '#fff' : '#000')};
  border: none;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: #8f735f;
    color: #fff;
  }
`

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginatorButton
          key={i}
          $active={i === currentPage}
          onClick={() => {
            onPageChange(i)
            window.scrollTo({ top: 0 })
          }}
        >
          {i}
        </PaginatorButton>,
      )
    }
    return pageNumbers
  }

  return (
    <PaginatorContainer>
      {currentPage > 1 && (
        <PaginatorButton onClick={handlePreviousPage}>上一頁</PaginatorButton>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <PaginatorButton onClick={handleNextPage}>下一頁</PaginatorButton>
      )}
    </PaginatorContainer>
  )
}

export default Paginator
