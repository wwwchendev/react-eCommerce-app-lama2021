const CheckSquareIcon = ({ $color = '#000' }) => {
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
            d='M16.58 7.58L17.99 9L9.99 17L5.99 13.01L7.41 11.6L9.99 14.17L16.58 7.58Z'
            fill={$color}
          ></path>{' '}
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M19.7778 2H4.22222C3 2 2 3 2 4.22222V19.7778C2 21 3 22 4.22222 22H19.7778C21 22 22 21 22 19.7778V4.22222C22 3 21 2 19.7778 2ZM20 20H4V4H20V20Z'
            fill={$color}
          ></path>{' '}
        </g>
      </svg>
    </>
  )
}

export default CheckSquareIcon
