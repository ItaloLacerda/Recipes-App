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

export const searchRecipeDetails = async (revenueId, pathname) => {
  let URL = '';
  let path = '';

  if (pathname === `/meals/${revenueId.id}`) {
    URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${revenueId.id}`;
    path = 'meals';
  } else if (pathname === `/drinks/${revenueId.id}`) {
    path = 'drinks';
    URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${revenueId.id}`;
  }
  const reponseAPI = await fetch(URL);
  const data = await reponseAPI.json();
  return data[path][0];
};

export const fetchByCategory = async (type) => {
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  const response = await fetch(`https://www.${urlType}.com/api/json/v1/1/list.php?c=list`);
  const data = await response.json();
  return data[type];
};

export const filterByCategory = async (category, pathname) => {
  let URL = '';
  if (pathname === '/meals') {
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  } else if (pathname === '/drinks') {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  }
  const reponseAPI = await fetch(URL);
  const data = await reponseAPI.json();
  return data[pathname.substring(1)];
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
