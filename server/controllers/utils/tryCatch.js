const tryCatch = (controller) => {
    return async (req, res) => {
      try {
        await controller(req, res);
      } catch (error) {
        console.log('trycatch.js-err=',error);
        res.status(500).json({
          success: false,
          message: 'trycatch.js-Something went wrong! try again later',
        });
      }
    };
  };
  
  export default tryCatch;