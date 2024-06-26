const CheckBlankIcon = ({ $color = '#000' }) => {
  return (
    <>
      <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.22222 2H19.7778C21 2 22 3 22 4.22222V19.7778C22 21 21 22 19.7778 22H4.22222C3 22 2 21 2 19.7778V4.22222C2 3 3 2 4.22222 2ZM4 20H20V4H4V20Z'
            fill={$color}
          ></path>{' '}
        </g>
      </svg>
    </>
  )
}

export default CheckBlankIcon
