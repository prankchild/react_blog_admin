import './index.scss';

function CommonSearchItem(props: any) {
  const { star, label = '默认', content } = props;
  return (
    <div className="search-item">
      {star ? <span className="mr-2 red">*</span> : ''}
      {label ? <span className="mr-2 tittle">{label}:</span> : ''}
      {content ? <span>{content}</span> : ''}
    </div>
  );
}

export default CommonSearchItem;
