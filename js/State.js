export class State {
    constructor() {
        this.recipes = [];
    }

    setRecipes(data) {
        this.recipes = data;
    }

    getRecipes(sortType = 'default') {
        let sortedRecipes = [...this.recipes];

        if (sortType === 'time-asc') {
            sortedRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
        } else if (sortType === 'time-desc') {
            sortedRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
        }

        return sortedRecipes;
    }
}