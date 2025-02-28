import { NavbarItem } from '../elements/NavbarItem';
import './styles.css'

export const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <ul className="menu">
        <NavbarItem isCollapsed itemList={[{title: 'Lorem Ipsun'}]}>Lorem Ipsun</NavbarItem>
        <NavbarItem url="#">Lorem Ipsun</NavbarItem>
        <NavbarItem isCollapsed itemList={[{title: 'Lorem Ipsun'}, {title: 'Lorem Ipsun'}]}>Lorem Ipsun</NavbarItem>
        </ul>
      </nav>
      <div className='profile'>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="52" height="52" rx="26" fill="white"/>
            <path d="M39.3333 41V37.6667C39.3333 35.8986 38.6309 34.2029 37.3807 32.9526C36.1304 31.7024 34.4347 31 32.6666 31H19.3333C17.5652 31 15.8695 31.7024 14.6192 32.9526C13.369 34.2029 12.6666 35.8986 12.6666 37.6667V41" stroke="#588157" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M26 24.3333C29.6819 24.3333 32.6667 21.3486 32.6667 17.6667C32.6667 13.9848 29.6819 11 26 11C22.3181 11 19.3334 13.9848 19.3334 17.6667C19.3334 21.3486 22.3181 24.3333 26 24.3333Z" stroke="#588157" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
