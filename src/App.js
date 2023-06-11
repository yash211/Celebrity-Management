import './App.css';
import CelebsList from './components/celebs_list';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <CelebsList/>
    </div>
  );
}

export default App;

