export default async function retryCall<T>(apiCall: () => T, maxRetry = 3): Promise<T> {
  var retryCount = 0;
  var data;

  do {
    retryCount = retryCount + 1;
    data = await apiCall();
  } while (!data && retryCount < maxRetry);

  return data;
}
