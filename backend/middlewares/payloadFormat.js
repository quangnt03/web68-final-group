const payloadFormatMiddleware = (_, res) => {
  const status = res.statusCode ? res.statusCode : 200;
  const data = res.data;

  return res.status(status).json({
    success: true,
    data,
  });
};

module.exports = payloadFormatMiddleware;
