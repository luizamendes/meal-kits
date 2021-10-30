import * as Sentry from "@sentry/react";

export const logger = (message: string) => {
  return Sentry.captureException(message);
};
