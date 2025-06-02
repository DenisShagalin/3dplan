export const Background = ({
  src
}: {
  src: string[];
}) => {

  const urls = src.map(src => `url("${src}")`).join(',');

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        filter: 'blur(1px) brightness(70%)',
        backgroundImage: urls,
        backgroundSize: 'cover',
      }}
    >
    </div>
  );
};
