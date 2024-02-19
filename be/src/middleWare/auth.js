import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    res.json({ stat: "False", mes: "please enter token" });
  }
  try {
    const decoded = jwt.verify(token, "MyTokenKey");
    req.user = decoded;
    next();
  } catch (err) {
    return { stat: "False", mes: "token is wrong" };
  }
};
