export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  let timer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timer) return;

    fn(...args);

    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}
