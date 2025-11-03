const Fonts = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');
    
    @font-face {
      font-family: 'BaseNeueTrial';
      src: url('/fonts/BaseNeueTrial-SuperCnSmBdObl.ttf') format('truetype');
      font-weight: 900;
      font-style: italic;
    }

    @font-face {
      font-family: 'WhyteInktrap';
      src: url('/fonts/WhyteInktrap-Super.ttf') format('truetype');
      font-weight: 900;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Whyte Space';
      src: url('/fonts/WhyteSpace-Regular.woff2') format('woff2'),
           url('/fonts/WhyteSpace-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Whyte Space';
      src: url('/fonts/WhyteSpace-Bold.woff2') format('woff2'),
           url('/fonts/WhyteSpace-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }

    /* Local Matrix font for C2C modal */
    @font-face {
      font-family: 'Matrix';
      src: url('/fonts/matrix.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
  `}</style>
)

export default Fonts
