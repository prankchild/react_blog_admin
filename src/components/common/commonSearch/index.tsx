import './index.scss';

function CommonSearch(props: any) {
  const { content, button } = props;
  return (
    <div className="common-search">
      <div className="search-condition">{content}</div>
      <div className="search-button">{button}</div>
    </div>
  );
}

export default CommonSearch;
