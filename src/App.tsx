import { BrowserRouter } from 'react-router-dom';
import Router from '@/routers';
import AuthRouter from './routers/utils/authRouter';

function App() {
  return (
    <div className="App">
      {/* <Layout></Layout> */}
      {/* <Login></Login> */}
      <BrowserRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </BrowserRouter>
    </div>
  );
}

export default App;
