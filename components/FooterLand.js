import { Box } from "@chakra-ui/react";

const FooterLand = () => {
  return (
    <Box
      as="footer"
      width="100vw"
      height="100px"
      zIndex={10}
      backgroundImage="url('/Footer_NG.png')"
      backgroundRepeat="repeat-x"
      backgroundPosition="0 0"
      backgroundSize="4000px 100%"
      animation="scrollLand 20s linear infinite"
      _before={{
        content: '""',
        display: 'block',
        width: '100%',
        height: '100%',
      }}
      boxShadow="0 -2px 8px rgba(0,0,0,0)"
      position="relative"
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
    >
      <Box
        position="absolute"
        left="80px"
        bottom="5"
        width="50px"
        height="50px"
        backgroundImage="url('/ryu.gif')"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        zIndex={11}
      />
    </Box>
  );
};

export default FooterLand;

// Add the animation keyframes globally (in _app.js or a global CSS file):
// @keyframes scrollLand {
//   0% { background-position-x: 0; }
//   100% { background-position-x: -1000px; } // Adjust -1000px to match your image width for seamless loop
// } 