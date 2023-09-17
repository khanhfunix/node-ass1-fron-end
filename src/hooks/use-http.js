function useHttp() {
  const sendRequest = useCallback(
    async (configURL, applyData) => {
      try {
        const response = await fetch(configURL.url, {
          method: configURL.method ? configURL.method : "GET",
          headers: configURL.headers ? configURL.headers : {},
          body: configURL.body ? JSON.stringify(configURL.body) : null,
        });

        if (!response.ok) {
          throw new Error("Could not fetch API");
        }
        const data = await response.json();

        applyData(data);
      } catch (error) {
        console.log(error);
      }
    },
    [configURL, applyData]
  );
  return { sendRequest };
}

export default useHttp;
