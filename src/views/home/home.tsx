import { Button } from 'antd';

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
export default Home;
