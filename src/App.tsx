import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/routers';
import AuthRouter from './routers/utils/authRouter';

function App(props: any) {
  console.log(props, 'props123');

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
const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(App);
