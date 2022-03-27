export default (() => {
  let timer: NodeJS.Timeout

  return (callback: () => void, ms: number) => {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();