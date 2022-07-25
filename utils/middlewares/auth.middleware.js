export const verifyAdmin = async (req, res, next) => {
    if (req.user?.role === 'Admin') {
        return next();
      };
      res.redirect('/login');
};