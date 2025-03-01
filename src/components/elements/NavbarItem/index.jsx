import './styles.css'

export const NavbarItem = ({ children, url, isCollapsed = false, itemList = [] }) => {
  return (
    <li>
        {url && (
            <a href={url}>
                {children}
            </a>)}
        
        {isCollapsed && (
            <>
                <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M4.75 7.125L9.5 11.875L14.25 7.125"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </svg>
                {children}
                <div className="dropdown-content">
                    {itemList.map((item, index) => (
                        <a href="#" key={index}>{item.title}</a>
                    ))}
                </div>
            </>
        )}
    </li>
  )
}
