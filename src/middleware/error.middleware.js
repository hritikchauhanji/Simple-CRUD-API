const errorHandler = (error, req, reply) => {
  if (error.name === "ZodError") {
    const errors = {};

    error.issues.forEach((issue) => {
      const field = issue.path.join(".") || "body";
      errors[field] = issue.message;
    });

    return reply.status(400).send({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  reply.status(500).send({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

export { errorHandler };
