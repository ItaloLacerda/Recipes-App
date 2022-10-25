export const fetchTheMealDBFilterIngredient = async (ingrediente) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const reponseAPI = await fetch(URL);
  const data = await reponseAPI.json();
  return data;
};

export const fetchTheMealDBSearchName = async (name) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const reponseAPI = await fetch(URL);
  const data = await reponseAPI.json();
  return data;
};

export const fetchTheMealDBSearchFirstLetter = async (firstLetter) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const reponseAPI = await fetch(URL);
  const data = await reponseAPI.json();
  return data;
};
