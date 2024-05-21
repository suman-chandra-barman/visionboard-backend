/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  const errorMessage = err.message.match(/"([^"]+)"/);
  const extractedErrorMessage = errorMessage && errorMessage[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedErrorMessage} is already exist`,
    },
  ];

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleDuplicateError;
