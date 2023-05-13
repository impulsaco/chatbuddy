export const logger = {
  debug: function (...messages) {
    // Debug level can contain things like stack traces, input and output parameters, or special messages for developers.
    // Only when in dev, we need to log debug details.
    if (process.env.NODE_ENV === "development") {
      console.debug(...messages);
    }
  },

  // This log level is also used to display general information about the process of the application.
  info: function (...messages) {
    console.info(...messages);
  },

  // A warning is typically used to indicate a potential problem that isn't preventing the program from working but could cause issues in the future.
  warn: function (...messages) {
    console.warn(...messages);
  },

  // Used for logging error messages. These are typically issues that have caused an operation to fail.
  error: function (...messages) {
    console.error(...messages);
  },
};
