export class State {
    constructor() {
        this.recipes = [];
    }

    // Сохраняем новые данные из API
    setRecipes(data) {
        this.recipes = data;
    }

    // Получаем текущие данные (с возможностью сортировки)
    getRecipes(sortType = 'default') {
        // Создаем копию массива, чтобы не мутировать оригинал
        let sortedRecipes = [...this.recipes];

        if (sortType === 'time-asc') {
            sortedRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
        } else if (sortType === 'time-desc') {
            sortedRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
        }

        return sortedRecipes;
    }
}