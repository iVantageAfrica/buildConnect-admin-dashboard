


export function handleApiError(error: any, context = "Request", toast: any) {
  let title = "Error";
  let message = `${context} failed. Please try again.`;

  if (error?.response) {
    const status = error.response.status;

    switch (status) {
      case 400:
        message = error.response.data?.message || "Invalid input. Please check your data.";
        break;
      case 401:
        message = "Unauthorized. Please login again.";
        break;
      case 403:
        message = "You do not have permission to perform this action.";
        break;
      case 404:
        message = error.response.data?.message;
        break;
      case 422:
        message = "Validation failed. Please correct the errors and try again.";
        break;
      case 429:
        message = "Too many requests. Please slow down.";
        break;
      case 500:
        message = "A server error occurred. Please try again later.";
        break;
      default:
        message = error.response.data?.message || `Unexpected error (Status: ${status}).`;
        break;
    }

  } else if (error?.request) {
    message = "Network error. Please check your internet connection.";
  } else {
    message = "An unknown error occurred. Please try again.";
  }

  toast.error(title, message);
}
