import { connect } from 'react-redux';
import { Button } from 'antd';
import { setToken } from '@/store/modules/global/action';

function Home(props: any) {
  console.log(props, 'props');
  const { token, setToken } = props;
  const editRedux = () => {
    setToken('我在改变token的数据');
  };
  return (
    <div className="">
      {token}
      <Button onClick={editRedux}>测试</Button>
    </div>
  );
}
const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setToken };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
