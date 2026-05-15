function validate(schema) {
  return (req, _res, next) => {
    const parsed = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params
    });

    if (!parsed.success) {
      return next(parsed.error);
    }

    req.body = parsed.data.body;
    req.query = parsed.data.query;
    req.params = parsed.data.params;
    return next();
  };
}

module.exports = { validate };
