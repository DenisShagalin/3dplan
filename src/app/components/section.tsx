import './section.css';

export const Section = ({
  children
}: {
  children: any
}) => (
  <div className="section">
    {children}
  </div>
);
