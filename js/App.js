import { Api } from './Api.js';
import { View } from './View.js';
import { State } from './State.js'; 

export class App {
    constructor() {
        this.api = new Api();
        this.view = new View();
        this.state = new State();
        
        this.greetingScreen = document.getElementById('greeting-screen');
        this.mainScreen = document.getElementById('main-screen');
        this.usernameInput = document.getElementById('username-input');
        this.startBtn = document.getElementById('start-btn');
        this.welcomeMessage = document.getElementById('welcome-message');
        
        this.searchInput = document.getElementById('search-input');
        this.dietFilter = document.getElementById('diet-filter');
        this.sortFilter = document.getElementById('sort-filter');
        this.searchBtn = document.getElementById('search-btn');
    }

    init() {
        this.startBtn.addEventListener('click', () => this.handleStart());
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Слушатель для сортировки: если выбрали другой пункт, сразу перерисовываем
        this.sortFilter.addEventListener('change', () => this.handleSort());
    }

    handleStart() {
        const username = this.usernameInput.value.trim();
        if (!username) return alert('Введите имя');

        this.greetingScreen.classList.remove('active');
        this.mainScreen.classList.add('active');
        this.welcomeMessage.textContent = `Привет, ${username}!`;
        
        this.handleSearch();
    }

    async handleSearch() {
        const query = this.searchInput.value.trim();
        const diet = this.dietFilter.value;

        // 1. Получаем данные (Слой Данных)
        const recipes = await this.api.fetchRecipes(query, diet);
        
        // 2. Сохраняем в состояние
        this.state.setRecipes(recipes);
        
        // 3. Отрисовываем, учитывая текущую сортировку (Слой Отображения)
        this.handleSort();
    }

    handleSort() {
        const sortType = this.sortFilter.value;
        // Получаем отсортированные данные из состояния
        const sortedRecipes = this.state.getRecipes(sortType);
        // Рисуем их
        this.view.renderRecipes(sortedRecipes);
    }
}