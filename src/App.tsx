import { HashRouter } from 'react-router-dom';
import Router from '@/routers';
import AuthRouter from './routers/utils/authRouter';

function App() {
  return (
    <div className="App">
      {/* <Layout></Layout> */}
      {/* <Login></Login> */}
      <HashRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </HashRouter>
    </div>
  );
}

export default App;
