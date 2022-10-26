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
  console.log(data);
  return data;
};

export const fetchSearchFirstLetter = async (firstLetter, pathname) => {
  console.log('chamou');
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

export const fetchMealsAndDrinks = async (pathname) => {
  let endpoint = '';
  if (pathname === '/meals') {
    endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  } else if (pathname === '/drinks') {
    endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }
  const request = await fetch(endpoint);
  if (pathname === '/meals') {
    const { meals } = await request.json();
    return meals;
  } if (pathname === '/drinks') {
    const { drinks } = await request.json();
    return drinks;
  }
};
