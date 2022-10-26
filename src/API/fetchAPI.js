export const fetchFilterIngredient = async (ingrediente, pathname) => {
  let URL = '';
  if (pathname === '/meals') {
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  } else if (pathname === '/drinks') {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  }
  const reponseAPI = await fetch(URL);
  const data = await reponseAPI.json();
  return data;
};

export const fetchSearchName = async (name, pathname) => {
  let URL = '';
  if (pathname === '/meals') {
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  } else if (pathname === '/drinks') {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  }
  const reponseAPI = await fetch(URL);
  const data = await reponseAPI.json();
  return data;
};

export const fetchSearchFirstLetter = async (firstLetter, pathname) => {
  let URL = '';
  if (pathname === '/meals') {
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  } else if (pathname === '/drinks') {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  }
  const reponseAPI = await fetch(URL);
  const data = await reponseAPI.json();
  return data;
};
