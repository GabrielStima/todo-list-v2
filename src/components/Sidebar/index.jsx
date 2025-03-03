import logo from '../../assets/images/logo.png';
import './styles.css'

export const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
  return (
    <section className={`sidebar ${!sidebarOpen ? 'closed' : ''}`}>
      <img src={logo} alt="" />
      <svg onClick={() => setSidebarOpen(!sidebarOpen)} className={`${!sidebarOpen ? 'rotate' : ''}`} width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30.625 36.75L18.375 24.5L30.625 12.25" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className="footer">
        <p>© 2025. Gabriel Stimamiglio. All rights reserved.</p>
      </div>
    </section>
  )
}
