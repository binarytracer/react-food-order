import { useCallback, useEffect } from "react";
import { useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export default function useHttp(url, config, initialData) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await sendHttpRequest(url, config);
      setData(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message || "Something went wrong!";
      setError(errorMessage);
    }
  }, [url, config]);

  useEffect(() => {
    if (config.method === "GET" || !config.method) {
      sendRequest();
    }
  }, []);

  return { isLoading, data, error, sendRequest };
}
