export class View {
    constructor() {
        this.recipesContainer = document.getElementById('recipes-container');
        this.statsContainer = document.getElementById('statistics-container');
        this.modal = document.getElementById('recipe-modal');
        this.modalBody = document.getElementById('modal-body');
        this.closeModalBtn = document.getElementById('close-modal');
    }

    clearContainer() {
        this.recipesContainer.innerHTML = '';
    }

    renderStatistics(recipes) {
        if (recipes.length === 0) {
            this.statsContainer.textContent = 'Рецепты не найдены.';
            return;
        }
        const totalMinutes = recipes.reduce((sum, recipe) => sum + recipe.readyInMinutes, 0);
        const avgMinutes = Math.round(totalMinutes / recipes.length);
        this.statsContainer.textContent = `Найдено рецептов: ${recipes.length}. Среднее время готовки: ${avgMinutes} мин.`;
    }

    createRecipeCard(recipe, onDetailsClick) {
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

        const btn = document.createElement('button');
        btn.textContent = 'Подробнее';
        btn.className = 'card-btn';
        btn.onclick = () => onDetailsClick(recipe);

        content.appendChild(title);
        content.appendChild(timeInfo);
        content.appendChild(btn);
        card.appendChild(image);
        card.appendChild(content);

        return card;
    }

    renderRecipes(recipes, onDetailsClick) {
        this.clearContainer();
        this.renderStatistics(recipes);
        recipes.forEach(recipe => {
            const card = this.createRecipeCard(recipe, onDetailsClick);
            this.recipesContainer.appendChild(card);
        });
    }

    showModal(recipe) {
        // Собираем ингредиенты (API может отдавать их в разных массивах)
        const ingredientsList = recipe.extendedIngredients 
            ? recipe.extendedIngredients 
            : [...(recipe.missedIngredients || []), ...(recipe.usedIngredients || [])];
            
        // Формируем HTML список
        const ingredientsHTML = ingredientsList.length > 0 
            ? ingredientsList.map(ing => `<li>🥗 ${ing.original}</li>`).join('') 
            : '<li>Информация об ингредиентах не найдена</li>';

        this.modalBody.innerHTML = `
            <h2 class="modal-title">${recipe.title}</h2>
            <img class="modal-img" src="${recipe.image}" alt="${recipe.title}">
            <div class="modal-ingredients">
                <h3>Ингредиенты:</h3>
                <ul>
                    ${ingredientsHTML}
                </ul>
            </div>
            <div class="modal-footer">
                <p><strong>⏱ Время приготовления:</strong> ${recipe.readyInMinutes} минут</p>
                <a href="${recipe.sourceUrl}" target="_blank" class="modal-link">Перейти к оригиналу рецепта</a>
            </div>
        `;
        this.modal.classList.remove('hidden');
    }

    hideModal() {
        this.modal.classList.add('hidden');
    }
}