const categoriesContainer = document.getElementById('categories');
const mealsContainer = document.getElementById('meals');
const searchBox = document.getElementById('searchBox');

function loadCategories() {
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
      categoriesContainer.innerHTML = '';
      data.categories.forEach(category => {
        const div = document.createElement('div');
        div.className = 'card';
        div.onclick = () => loadMealsByCategory(category.strCategory);
        div.innerHTML = `
          <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
          <h4>${category.strCategory}</h4>
        `;
        categoriesContainer.appendChild(div);
      });
    });
}

function loadMealsByCategory(category) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(res => res.json())
    .then(data => {
      mealsContainer.innerHTML = '';
      data.meals.forEach(meal => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h4>${meal.strMeal}</h4>
        `;
        mealsContainer.appendChild(div);
      });
    });
}

searchBox.addEventListener('input', function () {
  const query = this.value.trim();
  if (!query) {
    mealsContainer.innerHTML = '';
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      mealsContainer.innerHTML = '';
      if (data.meals) {
        data.meals.forEach(meal => {
          const div = document.createElement('div');
          div.className = 'card';
          div.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h4>${meal.strMeal}</h4>
          `;
          mealsContainer.appendChild(div);
        });
      } else {
        mealsContainer.innerHTML = '<p>No recipes found.</p>';
      }
    });
});
loadCategories();
