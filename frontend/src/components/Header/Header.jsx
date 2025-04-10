import { Header as CarbonHeader, HeaderName, HeaderGlobalBar } from 'carbon-components-react';
import ICLOGO from '../../assets/images/document-review.png';

const Header = () => {
  return (
    <CarbonHeader aria-label="IC App Header">
      {/* Logo + App Title */}
      <HeaderName prefix="">
        <img
          src={ICLOGO}
          alt="IC Logo"
          style={{ height: '32px', marginRight: '0.5rem' }}
        />
        Document Review
      </HeaderName>

      {/* Filler to push items to the right */}
      <div style={{ flex: 1 }} />

      {/* Custom text menu on the right */}
      <HeaderGlobalBar>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingRight: '1rem' }}>
          <span style={{ cursor: 'pointer' }}>FAQ</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
          <span style={{ cursor: 'pointer' }}>Light / Dark</span>
          <div
            style={{
              height: '32px',
              width: '32px',
              borderRadius: '50%',
              backgroundColor: '#6f6f6f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            LS
          </div>
        </div>
      </HeaderGlobalBar>
    </CarbonHeader>
  );
};

export default Header;
