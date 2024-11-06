import Image from "next/image";

export default function Home() {
  return (
    <div className="wrapper">
      <Image
        src="/3dplan.jpg"
        alt="3dplan"
        priority
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: '60%',
          height: 'auto',
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}
      />
    </div>
  );
}
