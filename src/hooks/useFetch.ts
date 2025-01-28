import { useEffect, useState } from "react";
import { GadgetsType } from "../context/DataContext";

type useFetchType = {
  data: GadgetsType[];
  fetchError: any;
  isLoading: boolean;
};

const useFetch = (dataUrl: string): useFetchType => {
  const [data, setData] = useState<GadgetsType[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async (url: string): Promise<void> => {
      setIsLoading(true);

      try {
        if (isMounted) {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
          }
          const data: GadgetsType[] = await response.json();
          setData(data);
        }
      } catch (error) {
        if (isMounted) {
          if (error instanceof Error) {
            setFetchError(error.message);
          } else {
            setFetchError("An unknown error occurred. Please try again.");
          }
        }
      } finally {
        isMounted && setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchData(dataUrl);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useFetch;
