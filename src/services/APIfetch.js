const fetchByCategory = async (type) => {
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  const response = await fetch(`https://www.${urlType}.com/api/json/v1/1/list.php?c=list`);
  const data = await response.json();
  return data[type];
};

export default fetchByCategory;
