const HeartTickIcon = ({ $color = "currentColor", $fill = "none" }) => {
  const defaultColor = "#292D32"
  return (<>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 17.2C22 18.1 21.75 18.95 21.3 19.67C20.47 21.06 18.95 22 17.2 22C15.45 22 13.92 21.06 13.1 19.67C12.66 18.95 12.4 18.1 12.4 17.2C12.4 14.55 14.55 12.4 17.2 12.4C19.85 12.4 22 14.55 22 17.2Z" stroke={$color || defaultColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M15.3301 17.2L16.5101 18.38L19.0701 16.02" stroke={$color || defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M22 8.69C22 10.66 21.49 12.4 20.69 13.91C19.81 12.98 18.57 12.4 17.2 12.4C14.55 12.4 12.4 14.55 12.4 17.2C12.4 18.43 12.87 19.55 13.63 20.4C13.26 20.57 12.92 20.71 12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.09998 7.56 3.09998C9.37 3.09998 10.99 3.98002 12 5.33002C13.01 3.98002 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.6 22 8.69Z" stroke={$color || defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  </>
  )
}

export default HeartTickIcon