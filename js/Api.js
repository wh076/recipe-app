export class Api {
    constructor() {
        this.apiKey = 'e4a969119b664be9ba48977e2601cbf3';
        this.baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
    }

    async fetchRecipes(query = '', diet = '') {
        // Добавили fillIngredients=true чтобы API возвращал ингредиенты!
        const url = `${this.baseUrl}?apiKey=${this.apiKey}&query=${query}&diet=${diet}&addRecipeInformation=true&fillIngredients=true&number=12`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Ошибка сети');
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            return [];
        }
    }
}