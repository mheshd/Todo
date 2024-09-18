export const isBrowser = typeof window !== "undefined";

export const requestHandler = async (api, setLoading, onSuccess, onError) => {
  if (setLoading) setLoading(true);
  try {
    const response = await api();
    const { data } = response;
    if (response.data?.success) {
      onSuccess(data);
    }
  } catch (error) {
    console.error("Errors:", error);
    if (error.response) {
      console.error("Response error data:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    onError(error.response?.data?.message || "Something went wrong");
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const classNames = (...className) => {
  return className.filter(Boolean).join(" ");
};
