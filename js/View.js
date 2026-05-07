export class View {
    constructor() {
        this.recipesContainer = document.getElementById('recipes-container');
        this.statsContainer = document.getElementById('statistics-container');
    }

    // Очистка контейнера перед новым поиском
    clearContainer() {
        this.recipesContainer.innerHTML = '';
    }

    // Отрисовка статистики
    renderStatistics(recipes) {
        if (recipes.length === 0) {
            this.statsContainer.textContent = 'Рецепты не найдены.';
            return;
        }

        const totalMinutes = recipes.reduce((sum, recipe) => sum + recipe.readyInMinutes, 0);
        const avgMinutes = Math.round(totalMinutes / recipes.length);

        this.statsContainer.textContent = `Найдено рецептов: ${recipes.length}. Среднее время готовки: ${avgMinutes} мин.`;
    }

    // Создание одной карточки через createElement
    createRecipeCard(recipe) {
    const card = document.createElement('article');
    card.className = 'recipe-card';

    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.title;

    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('h3');
    title.textContent = recipe.title;

    const timeInfo = document.createElement('p');
    timeInfo.textContent = `⏱ ${recipe.readyInMinutes} мин.`;

    // Интерактивный элемент: кнопка
    const btn = document.createElement('button');
    btn.textContent = 'Подробнее';
    btn.className = 'card-btn';
    btn.onclick = () => alert(`Вы выбрали рецепт: ${recipe.title}`);

    content.appendChild(title);
    content.appendChild(timeInfo);
    content.appendChild(btn);

    card.appendChild(image);
    card.appendChild(content);

    return card;
}

    // Отрисовка массива карточек
    renderRecipes(recipes) {
        this.clearContainer();
        this.renderStatistics(recipes);

        recipes.forEach(recipe => {
            const card = this.createRecipeCard(recipe);
            this.recipesContainer.appendChild(card);
        });
    }
}