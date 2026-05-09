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
        
        this.usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleStart();
        });

        this.searchBtn.addEventListener('click', () => this.handleSearch());

        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        this.sortFilter.addEventListener('change', () => this.handleSort());

        // Закрытие модалки
        this.view.closeModalBtn.onclick = () => this.view.hideModal();
        window.onclick = (event) => {
            if (event.target === this.view.modal) this.view.hideModal();
        };

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.view.hideModal();
                this.searchInput.value = '';
                this.handleSearch();
            }
        });
    }

    handleStart() {
        const username = this.usernameInput.value.trim();
        if (!username) return alert('Введите имя');

        this.greetingScreen.classList.remove('active');
        this.greetingScreen.classList.add('hidden');
        this.mainScreen.classList.remove('hidden');
        this.mainScreen.classList.add('active');
        this.welcomeMessage.textContent = `Привет, ${username}!`;

        this.handleSearch();
    }

    async handleSearch() {
        const query = this.searchInput.value.trim();
        const diet = this.dietFilter.value;
        const recipes = await this.api.fetchRecipes(query, diet);
        this.state.setRecipes(recipes);
        this.handleSort();
    }

    handleSort() {
        const sortType = this.sortFilter.value;
        const sortedRecipes = this.state.getRecipes(sortType);
        this.view.renderRecipes(sortedRecipes, (recipe) => this.view.showModal(recipe));
    }
}