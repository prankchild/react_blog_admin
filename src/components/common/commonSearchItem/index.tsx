import './index.scss';

function CommonSearchItem(props: any) {
  const { star, label = '默认' } = props;
  return (
    <div className="search-item">
      {star ? <span className="mr-1.5 red">*</span> : ''}
      {label ? <div className="mr-2 title">{label}:</div> : ''}
      {props.children}
    </div>
  );
}

export default CommonSearchItem;
