export default function DS() {
  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(120deg, #101c2c 0%, #162447 30%, #00aaff 60%, #89EF8C 90%, #101c2c 100%)',
        backgroundSize: '200% 200%',
        animation: 'dsBgAnim 24s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes dsBgAnim {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  )
} 