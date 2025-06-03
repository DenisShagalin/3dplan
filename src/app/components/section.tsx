import './section.css';

export const Section = ({
  children
}: {
  children: any
}) => (
  <div className="section" style={{ position: 'relative' }}>
    {children}
  </div>
);
