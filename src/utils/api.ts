const readAll = async () => {
  try {
    const response = await fetch("/.netlify/functions/hello");
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { readAll };
