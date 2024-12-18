const getElement = selection => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(`the ${selection} dose not exist`);
};

export default getElement;
