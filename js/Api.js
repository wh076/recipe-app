export class Api {
    constructor() {
        this.apiKey = 'e4a969119b664be9ba48977e2601cbf3';
        this.baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
    }

    async fetchRecipes(query = '', diet = '') {
        // Формируем URL. Указываем addRecipeInformation=true, чтобы получить время готовки
        const url = `${this.baseUrl}?apiKey=${this.apiKey}&query=${query}&diet=${diet}&addRecipeInformation=true&number=12`;

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.results; 
        } catch (error) {
            console.error('Fetch error:', error);
            return []; 
        }
    }
}