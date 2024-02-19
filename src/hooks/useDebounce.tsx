import debounce from '@/utilities/debounce';

const useDebouncedUpdate = (
  callBack: (...args: unknown[]) => void,
  delay: number
) => {
  const debouncedFn = debounce(callBack, delay);
  return debouncedFn;
};

export default useDebouncedUpdate;
