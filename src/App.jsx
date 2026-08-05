import './App.css';
import { Outlet } from 'react-router-dom';
import Adminnavabar from './feature/navabars/adminnavabar';

function App() {
  return (
    <div className=' '>
          <Adminnavabar></Adminnavabar>
         <Outlet></Outlet>
    </div>
  );
}

export default App;
