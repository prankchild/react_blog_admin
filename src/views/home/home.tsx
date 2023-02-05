import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

function Home(props: any) {
  console.log(props, 'props');

  // 获取残酷数据
  // const { num } = useSelector((state: { num: number }) => ({
  //   num: state.num,
  // }));
  const dispatch = useDispatch();
  const editRedux = () => {
    dispatch({ type: 'add', value: 100 });
  };
  return (
    <div className="">
      {/* {num} */}
      <Button onClick={editRedux}>测试</Button>
    </div>
  );
}

export default Home;
