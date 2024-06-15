const HeartFolderIcon = ({ $color = "currentColor", $fill = "none" }) => {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        stroke={$color}
        strokeWidth="1.91"
        strokeMiterlimit="10"
      >
        <path
          fill="none"
          d="M12,3.41,10.09,1.5H1.5V20.59A1.9,1.9,0,0,0,3.41,22.5H20.59a1.9,1.9,0,0,0,1.91-1.91V3.41Z"
        />
        <line x1="1.5" y1="7.23" x2="22.5" y2="7.23" />
        <path
          fill={$color}
          d="M15.82,14a2.05,2.05,0,0,0-2.08-2,2.1,2.1,0,0,0-1.74.9,2.1,2.1,0,0,0-1.74-.9,2.05,2.05,0,0,0-2.08,2c0,2.36,3.82,3.71,3.82,3.71S15.82,16.38,15.82,14Z"
        />
      </svg>
    </>
  );
}

export default HeartFolderIcon;
