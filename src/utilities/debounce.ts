function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: T): void {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default debounce;