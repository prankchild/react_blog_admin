import Avatar from './avatar';
import LayoutCrumbs from './crumbs';

function LayoutHeader() {
  return (
    <header className="header">
      <div className="header-container">
        <LayoutCrumbs />
        <Avatar />
      </div>
    </header>
  );
}
export default LayoutHeader;
