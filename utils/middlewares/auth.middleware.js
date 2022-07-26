export const verifyAdmin = async (req, res, next) => {
  if (req.user?.role === 'Admin') {
    return next();
  };
  res.redirect('/login');
};

export const verifyUser = (req, res, next) => {
  if (req.user?.role === 'Customer' && req.user?.verified === true) {
    return next();
  };
  res.redirect('/login');
};
