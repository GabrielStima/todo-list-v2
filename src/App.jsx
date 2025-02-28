import './assets/css/index.css';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Projectbar } from './components/Projectbar';
import { LaneArea } from './components/LaneArea';

export const App = () => {
  return (
    <div className='app'>
        <header>
          <Navbar/>
          <Sidebar/>
        </header>
        <main className="content">
          <Projectbar/>
          <LaneArea/>
        </main>
    </div>
  )
}