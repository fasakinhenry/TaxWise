import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './utils/router';
import Footer from './layouts/Footer/Footer';

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50 text-gray-900 flex flex-col'>
        {/* <Navbar /> */}
        <main className='flex-grow'>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
