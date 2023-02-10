import loginLeft from '@/assets/images/login_left.png';
import LoginForm from './components/loginForm';
import './login.scss';

function Login() {
  return (
    <div>
      <div className="login-bg" />
      <div className="logo" />
      <div className="login-container">
        <div className="login-left">
          <div className="login-left-window">
            <div className="login-vector animate__animated animate__fadeInLeftBig">
              <div className="image">
                <img src={loginLeft} alt="" />
              </div>
              <div className="text">
                <h2 className="text-title">博客React管理系统</h2>
                <span className="text-span">2023年02月04日开始</span>
              </div>
            </div>
          </div>
        </div>
        <div className="login-right">
          <div className="login-right-window animate__animated animate__fadeInRightBig">
            <LoginForm></LoginForm>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
