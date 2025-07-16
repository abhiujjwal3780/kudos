import './App.css';
import { UserContextProvider } from './store/UserContext';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './Router';
import PageHeader from './components/page_header/PageHeader';
import Footer from './components/footer/Footer';
function App() {
  return (
    <div className="App">
      <UserContextProvider >
          <Router>
            <PageHeader /> 
            <AppRoutes />
            <Footer />
          </Router>
      </UserContextProvider>  
    </div>
  );
}

export default App;
