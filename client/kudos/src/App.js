import './App.css';
import { UserContextProvider } from './store/UserContext';
import {BrowserRouter} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <UserContextProvider >
        <BrowserRouter>
          {/* Add your routes here */}  
          Kudos App
          </BrowserRouter>
      </UserContextProvider>  
    </div>
  );
}

export default App;
