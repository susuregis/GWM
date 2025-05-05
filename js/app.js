// Elementos DOM
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const pageLinks = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');
const dayButtons = document.querySelectorAll('.day-btn');
const workoutDays = document.querySelectorAll('.workout-day');
const exerciseHeaders = document.querySelectorAll('.exercise-header');
const addFoodModal = document.getElementById('addFoodModal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const addFoodButtons = document.querySelectorAll('.btn-small:not(.water-btn)');
const addFoodForm = document.getElementById('addFoodForm');
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
const waterButtons = document.querySelectorAll('.water-btn');
const waterLevel = document.querySelector('.water-level');
const waterAmount = document.querySelector('.water-amount');
const exportDataBtn = document.getElementById('exportData');
const updateMeasurementsBtn = document.getElementById('updateMeasurements');

// Elementos relacionados à criação de treino
const createWorkoutBtn = document.querySelector('.create-workout-btn');
const templatesBtn = document.querySelector('.templates-btn');
const createWorkoutModal = document.getElementById('createWorkoutModal');
const workoutTemplatesModal = document.getElementById('workoutTemplatesModal');
const addExerciseBtn = document.getElementById('addExerciseBtn');
const exercisesContainer = document.getElementById('exercisesContainer');
const createWorkoutForm = document.getElementById('createWorkoutForm');
const templateCategories = document.querySelectorAll('.template-category');
const templateContents = document.querySelectorAll('.template-category-content');
const useTemplateButtons = document.querySelectorAll('.use-template');

// Dados do aplicativo
let userData = {
    weight: [80, 79.5, 79, 78.2, 78, 77.5, 77, 76.8, 76.5, 76, 75.5, 75.8, 75.6, 75.3, 75, 74.8, 74.5, 74, 74.2, 74.5, 75, 75.5, 75.2, 75, 74.8, 74.5, 74, 74.2, 74.5, 82],
    calories: [1800, 1750, 1900, 1850, 1750, 1700, 1800, 1900, 2000, 1850, 1800, 1750, 1700, 1650, 1700, 1750, 1800, 1900, 2000, 1950, 1900, 1850, 1800, 1750, 1700, 1650, 1700, 1750, 1800, 1200],
    waterIntake: {
        current: 800,
        goal: 2000 // 2 liters
    },
    workouts: {
        segunda: {
            name: 'Treino de Pernas',
            exercises: [
                { name: 'Agachamento', sets: 4, reps: 12, weight: 60 },
                { name: 'Leg Press', sets: 3, reps: 15, weight: 100 },
                { name: 'Cadeira Extensora', sets: 3, reps: 12, weight: 50 }
            ]
        },
        terca: {
            name: 'Treino de Peito e Tríceps',
            exercises: [
                { name: 'Supino Reto', sets: 4, reps: 10, weight: 50 },
                { name: 'Crucifixo', sets: 3, reps: 12, weight: 14 },
                { name: 'Tríceps Corda', sets: 3, reps: 15, weight: 25 }
            ]
        },
        quarta: {
            name: 'Treino de Costas e Bíceps',
            exercises: [
                { name: 'Puxada Frente', sets: 4, reps: 10, weight: 60 },
                { name: 'Remada Curvada', sets: 3, reps: 12, weight: 40 },
                { name: 'Rosca Direta', sets: 3, reps: 12, weight: 25 }
            ]
        },
        // Adicione mais dias conforme necessário
    },
    nutrition: {
        calorieTarget: 2000,
        macros: {
            protein: { target: 100, current: 75 },
            carbs: { target: 200, current: 120 },
            fat: { target: 67, current: 30 }
        },
        meals: [
            {
                name: 'Café da Manhã',
                foods: [
                    { name: 'Ovos mexidos', quantity: '2 unidades', calories: 180, protein: 12, carbs: 1, fat: 10 },
                    { name: 'Pão integral', quantity: '2 fatias', calories: 140, protein: 5, carbs: 24, fat: 2 }
                ]
            },
            {
                name: 'Almoço',
                foods: [
                    { name: 'Arroz integral', quantity: '100g', calories: 130, protein: 3, carbs: 28, fat: 1 },
                    { name: 'Frango grelhado', quantity: '150g', calories: 250, protein: 40, carbs: 0, fat: 6 },
                    { name: 'Salada verde', quantity: '1 porção', calories: 50, protein: 2, carbs: 5, fat: 2 }
                ]
            },
            {
                name: 'Jantar',
                foods: [
                    { name: 'Salmão', quantity: '120g', calories: 280, protein: 25, carbs: 0, fat: 18 },
                    { name: 'Batata doce', quantity: '100g', calories: 170, protein: 2, carbs: 37, fat: 0 }
                ]
            }
        ]
    },
    measurements: {
        weight: { current: 82, change: -2 },
        cintura: { current: 85, change: -3 },
        braco: { current: 38, change: 2 },
        coxa: { current: 58, change: 1 }
    }
};

// Função para inicializar a aplicação
function initApp() {
    setupEventListeners();
    initializePage();
    initializeCharts();
    loadUserData();
    loadWorkoutData();
    initializeUserProfile();
}

// Configurar os ouvintes de eventos
function setupEventListeners() {
    // Menu de navegação
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Links de navegação
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            changePage(targetPage);
        });
    });
    
    // Water intake buttons
    waterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = parseInt(this.getAttribute('data-amount'));
            updateWaterIntake(amount);
        });
    });

    // Seletor de dia de treino
    dayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetDay = this.getAttribute('data-day');
            changeWorkoutDay(targetDay);
        });
    });

    // Expandir exercícios
    document.addEventListener('click', function(e) {
        if (e.target.closest('.exercise-header')) {
            const header = e.target.closest('.exercise-header');
            const details = header.nextElementSibling;
            const icon = header.querySelector('i');
            const isOpen = details.classList.toggle('open');
            
            if (isOpen) {
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        }
    });

    // Modal para adicionar alimentos
    addFoodButtons.forEach(button => {
        button.addEventListener('click', () => {
            addFoodModal.classList.add('open');
        });
    });

    // Botão para fechar modais
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Encontra o modal pai
            const modal = this.closest('.modal');
            if (modal) modal.classList.remove('open');
        });
    });

    addFoodForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Lógica para adicionar alimento
        const foodName = document.getElementById('foodName').value;
        const foodQuantity = document.getElementById('foodQuantity').value;
        const foodCalories = document.getElementById('foodCalories').value;
        
        if (foodName && foodQuantity && foodCalories) {
            addFood(foodName, foodQuantity, foodCalories);
            addFoodModal.classList.remove('open');
            this.reset();
        }
    });

    // Navegação inferior
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            changePage(targetPage);
        });
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    });
    
    // Eventos para criação de treino personalizado
    if (createWorkoutBtn) {
        createWorkoutBtn.addEventListener('click', () => {
            createWorkoutModal.classList.add('open');
        });
    }
    
    if (templatesBtn) {
        templatesBtn.addEventListener('click', () => {
            workoutTemplatesModal.classList.add('open');
        });
    }
    
    if (addExerciseBtn) {
        addExerciseBtn.addEventListener('click', addExerciseField);
    }
    
    // Delegação de eventos para remover exercícios
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-exercise')) {
            const button = e.target.closest('.remove-exercise');
            const exerciseItem = button.closest('.exercise-item-form');
            
            // Não remover se for o único exercício
            const exerciseItems = exercisesContainer.querySelectorAll('.exercise-item-form');
            if (exerciseItems.length > 1) {
                exerciseItem.remove();
            } else {
                alert('Você precisa ter pelo menos um exercício no treino.');
            }
        }
    });
    
    if (createWorkoutForm) {
        createWorkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveWorkout();
        });
    }
    
    // Alternar entre categorias de templates
    templateCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Remover classe ativa de todas as categorias
            templateCategories.forEach(c => c.classList.remove('active'));
            // Adicionar classe ativa a esta categoria
            this.classList.add('active');
            
            // Esconder todos os conteúdos
            templateContents.forEach(content => content.classList.remove('active'));
            
            // Mostrar o conteúdo correspondente
            const targetCategory = this.getAttribute('data-category');
            document.querySelector(`.template-category-content[data-category="${targetCategory}"]`).classList.add('active');
        });
    });
    
    // Botões para usar template
    useTemplateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateId = this.getAttribute('data-template');
            applyWorkoutTemplate(templateId);
            workoutTemplatesModal.classList.remove('open');
        });
    });
}

// Função para inicializar a página
function initializePage() {
    // Verifica se há uma página salva no localStorage
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        changePage(savedPage);
    }
}

// Função para mudar de página
function changePage(pageId) {
    // Atualiza classes ativas para links
    pageLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Atualiza classes ativas para navegação inferior
    bottomNavItems.forEach(item => {
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Mostra a página selecionada
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });

    // Salva a página atual no localStorage
    localStorage.setItem('currentPage', pageId);

    // Fecha menu em dispositivos móveis
    navMenu.classList.remove('open');
}

// Função para mudar o dia de treino
function changeWorkoutDay(dayId) {
    dayButtons.forEach(button => {
        if (button.getAttribute('data-day') === dayId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    workoutDays.forEach(day => {
        if (day.id === dayId) {
            day.classList.add('active');
        } else {
            day.classList.remove('active');
        }
    });
}

// Função para adicionar alimento
function addFood(name, quantity, calories) {
    const mealList = document.querySelector('.meal-list');
    const firstMeal = mealList.querySelector('.meal-item');
    
    if (firstMeal) {
        const foodList = firstMeal.querySelector('.food-items');
        const newFood = document.createElement('li');
        newFood.innerHTML = `
            <span class="food-name">${name}</span>
            <span class="food-quantity">${quantity}</span>
            <span class="food-calories">${calories} cal</span>
        `;
        foodList.appendChild(newFood);
        
        // Atualiza o contador de calorias
        updateCalorieCount(parseInt(calories));
    }
}

// Função para atualizar o contador de calorias
function updateCalorieCount(calories) {
    const calorieConsumed = document.querySelector('.calorie-consumed .calorie-number');
    const calorieRemaining = document.querySelector('.calorie-remaining .calorie-number');
    
    if (calorieConsumed && calorieRemaining) {
        const currentConsumed = parseInt(calorieConsumed.textContent);
        const currentRemaining = parseInt(calorieRemaining.textContent);
        
        const newConsumed = currentConsumed + calories;
        const newRemaining = currentRemaining - calories;
        
        calorieConsumed.textContent = newConsumed;
        calorieRemaining.textContent = newRemaining;
    }
}

// Função para inicializar os gráficos
function initializeCharts() {
    // Gráfico de peso
    const weightCtx = document.getElementById('weightChart').getContext('2d');
    const weightChart = new Chart(weightCtx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `Dia ${i+1}`),
            datasets: [{
                label: 'Peso (kg)',
                data: userData.weight,
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    min: Math.min(...userData.weight) - 2,
                    max: Math.max(...userData.weight) + 2
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Gráfico de calorias
    const caloriesCtx = document.getElementById('caloriesChart').getContext('2d');
    const caloriesChart = new Chart(caloriesCtx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `Dia ${i+1}`),
            datasets: [{
                label: 'Calorias',
                data: userData.calories,
                backgroundColor: 'rgba(255, 167, 38, 0.2)',
                borderColor: 'rgba(255, 167, 38, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    min: 1000,
                    max: 2500
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Gráfico de calorias diárias (resumo)
    const calorieCtx = document.getElementById('calorieChart').getContext('2d');
    const calorieChart = new Chart(calorieCtx, {
        type: 'doughnut',
        data: {
            labels: ['Consumidas', 'Restantes'],
            datasets: [{
                data: [1200, 800],
                backgroundColor: [
                    'rgba(255, 167, 38, 0.7)',
                    'rgba(76, 175, 80, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 167, 38, 1)',
                    'rgba(76, 175, 80, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: '70%'
        }
    });
}

// Função para carregar os dados do usuário
function loadUserData() {
    // Carregar dados de treinos
    for (const day in userData.workouts) {
        const dayElement = document.getElementById(day);
        if (dayElement) {
            const workoutData = userData.workouts[day];
            const dayTitle = dayElement.querySelector('h3');
            if (dayTitle) {
                dayTitle.textContent = `${capitalizeFirstLetter(day)}: ${workoutData.name}`;
            }
            
            // Adicionar exercícios (isso seria para uma implementação completa)
            // Como já temos exercícios definidos no HTML, vamos pular esta parte
        }
    }
    
    // Carregar dados de nutrição
    updateNutritionUI();
    
    // Carregar medidas corporais
    updateMeasurementsUI();
    
    // Carregar dados de consumo de água do localStorage
    const savedWaterIntake = localStorage.getItem('waterIntake');
    if (savedWaterIntake) {
        userData.waterIntake.current = parseInt(savedWaterIntake);
        // Atualiza a interface
        const percentageFilled = Math.min(100, (userData.waterIntake.current / userData.waterIntake.goal) * 100);
        waterLevel.style.height = percentageFilled + '%';
        waterAmount.textContent = userData.waterIntake.current + 'ml';
    }
}

// Função para carregar os dados de treinos do usuário
function loadWorkoutData() {
    // Verificar se há dados salvos
    const savedData = localStorage.getItem('fitlife_user_data');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            // Verificar se há dados de treino
            if (parsed && parsed.workouts) {
                userData.workouts = parsed.workouts;
                
                // Atualizar os indicadores visuais nos botões dos dias
                updateWorkoutIndicators();
                
                // Atualizar a interface com os dados carregados
                const currentActiveDay = document.querySelector('.day-btn.active')?.getAttribute('data-day') || 'segunda';
                updateWorkoutUI(currentActiveDay);
            }
        } catch (e) {
            console.error('Erro ao carregar dados de treino:', e);
        }
    }
    
    // Carregar histórico de treinos para cada exercício
    // Isso poderia ser implementado se necessário
}

// Função para atualizar a interface de nutrição
function updateNutritionUI() {
    // Apenas para demonstração - em um app real isso seria feito dinamicamente
    // com os dados reais do usuário
}

// Função para atualizar a interface de medidas
function updateMeasurementsUI() {
    // Apenas para demonstração - em um app real isso seria feito dinamicamente
    // com os dados reais do usuário
}

// Função para atualizar o consumo de água
function updateWaterIntake(changeAmount) {
    // Atualiza o valor no objeto de dados
    userData.waterIntake.current += changeAmount;
    
    // Garante que o valor não seja negativo
    if (userData.waterIntake.current < 0) {
        userData.waterIntake.current = 0;
    }
    
    // Atualiza a interface
    const percentageFilled = Math.min(100, (userData.waterIntake.current / userData.waterIntake.goal) * 100);
    
    // Atualiza a barra de progresso
    waterLevel.style.height = percentageFilled + '%';
    
    // Atualiza o texto
    waterAmount.textContent = userData.waterIntake.current + 'ml';
    
    // Salva no localStorage
    localStorage.setItem('waterIntake', userData.waterIntake.current);
    
    // Exibe mensagem de parabéns se atingiu a meta
    if (userData.waterIntake.current >= userData.waterIntake.goal) {
        showToast('Parabéns! Você atingiu sua meta de água diária!');
    }
}

// Função para exibir notificações toast
function showToast(message) {
    // Cria o elemento toast se não existir
    if (!document.querySelector('.toast')) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    // Remove o toast após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Adicionar campo de exercício no formulário de criação de treino
function addExerciseField() {
    const newExercise = document.createElement('div');
    newExercise.classList.add('exercise-item-form');
    
    newExercise.innerHTML = `
        <div class="form-group">
            <label>Nome do Exercício</label>
            <input type="text" class="exercise-name" placeholder="Ex: Agachamento" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Séries</label>
                <input type="number" class="exercise-sets" min="1" max="10" value="3" required>
            </div>
            <div class="form-group">
                <label>Repetições</label>
                <input type="number" class="exercise-reps" min="1" max="100" value="12" required>
            </div>
            <div class="form-group">
                <label>Peso (kg)</label>
                <input type="number" class="exercise-weight" min="0" step="0.5" placeholder="Opcional">
            </div>
        </div>
        <div class="form-group">
            <label>Descrição/Notas</label>
            <textarea class="exercise-notes" placeholder="Dicas ou instruções para o exercício"></textarea>
        </div>
        <button type="button" class="btn btn-small btn-delete remove-exercise">Remover</button>
    `;
    
    exercisesContainer.appendChild(newExercise);
}

// Salvar treino personalizado
function saveWorkout() {
    const workoutDay = document.getElementById('workoutDay').value;
    const workoutName = document.getElementById('workoutName').value;
    const exercises = [];
    
    // Criar data atual
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    
    // Coletar dados de todos os exercícios
    const exerciseItems = exercisesContainer.querySelectorAll('.exercise-item-form');
    exerciseItems.forEach(item => {
        const name = item.querySelector('.exercise-name').value;
        const sets = parseInt(item.querySelector('.exercise-sets').value);
        const reps = parseInt(item.querySelector('.exercise-reps').value);
        const weight = parseFloat(item.querySelector('.exercise-weight').value) || 0;
        const notes = item.querySelector('.exercise-notes').value;
        
        exercises.push({ name, sets, reps, weight, notes });
    });
    
    // Salvar o treino nos dados do usuário
    userData.workouts[workoutDay] = {
        name: workoutName,
        dataCriacao: dataFormatada,
        exercises: exercises
    };
      // Atualizar o armazenamento local
    localStorage.setItem('fitlife_user_data', JSON.stringify(userData));
    
    // Fechar o modal
    createWorkoutModal.classList.remove('open');
    
    // Atualizar os indicadores visuais de treino
    updateWorkoutIndicators();
    
    // Mudar para o dia da semana selecionado
    // Primeiro ativamos o botão do dia da semana
    const dayButtons = document.querySelectorAll('.day-btn');
    dayButtons.forEach(button => {
        if (button.getAttribute('data-day') === workoutDay) {
            button.click(); // Isso vai chamar changeWorkoutDay automaticamente
        }
    });
    
    // Recarregar a página de treino
    updateWorkoutUI(workoutDay);
    
    // Mostrar mensagem de sucesso
    showToast(`Treino "${workoutName}" criado com sucesso para ${getDayName(workoutDay)}! (${dataFormatada})`);
    
    // Resetar o formulário
    createWorkoutForm.reset();
    
    // Deixar apenas um exercício no formulário
    exercisesContainer.innerHTML = '';
    addExerciseField();
}

// Aplicar template de treino
function applyWorkoutTemplate(templateId) {
    let workoutTemplate;
    
    // Criar data atual
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    
    // Selecionar o template de treino com base no ID
    switch (templateId) {
        case 'full-body':
            workoutTemplate = createFullBodyTemplate();
            break;
        case 'abc':
            workoutTemplate = createABCTemplate();
            break;
        case 'ppl':
            workoutTemplate = createPPLTemplate();
            break;
        case 'high-intensity':
            workoutTemplate = createHighIntensityTemplate();
            break;
        default:
            showToast('Template não encontrado.');
            return;
    }
    
    // Aplicar o template aos dias da semana correspondentes
    Object.keys(workoutTemplate).forEach(day => {
        // Adicionar data de criação ao template
        workoutTemplate[day].dataCriacao = dataFormatada;
        userData.workouts[day] = workoutTemplate[day];
    });
      // Atualizar o armazenamento local
    localStorage.setItem('fitlife_user_data', JSON.stringify(userData));
    
    // Atualizar os indicadores visuais de treino
    updateWorkoutIndicators();
    
    // Primeiro dia do treino
    const firstDay = Object.keys(workoutTemplate)[0];
    
    // Selecionar automaticamente o primeiro dia do treino se existir
    if (firstDay) {
        const dayButtons = document.querySelectorAll('.day-btn');
        dayButtons.forEach(button => {
            if (button.getAttribute('data-day') === firstDay) {
                button.click(); // Isso vai chamar changeWorkoutDay automaticamente
            }
        });
    }
    
    // Recarregar a interface
    const currentActiveDay = document.querySelector('.day-btn.active').getAttribute('data-day');
    updateWorkoutUI(currentActiveDay);
    
    // Mostrar mensagem de sucesso
    showToast(`Treino aplicado com sucesso! Criado em ${dataFormatada}`);
}

// Atualizar a interface de treino
function updateWorkoutUI(day) {
    const workoutDay = document.getElementById(day);
    if (workoutDay && userData.workouts[day]) {
        const workout = userData.workouts[day];        // Atualizar o título do treino
        const workoutTitle = workoutDay.querySelector('h3');
        if (workoutTitle) {
            // Limpar qualquer conteúdo anterior
            workoutTitle.innerHTML = '';
            
            // Adicionar o texto principal
            const mainTitle = document.createElement('span');
            mainTitle.textContent = getDayName(day) + ': ' + workout.name;
            workoutTitle.appendChild(mainTitle);
            
            // Adicionar data de criação se existir
            if (workout.dataCriacao) {
                const dateSpan = document.createElement('span');
                dateSpan.className = 'creation-date';
                dateSpan.textContent = `Criado em ${workout.dataCriacao}`;
                workoutTitle.appendChild(dateSpan);
            }
        }
        
        // Limpar a lista de exercícios
        const exerciseList = workoutDay.querySelector('.exercise-list');
        if (exerciseList) {
            exerciseList.innerHTML = '';
            
            // Adicionar os exercícios
            workout.exercises.forEach((exercise, index) => {
                const exerciseId = `${day}-${index}-${exercise.name.toLowerCase().replace(/\s+/g, '-')}`;
                const exerciseItem = document.createElement('li');
                exerciseItem.classList.add('exercise-item');
                
                exerciseItem.innerHTML = `
                    <div class="exercise-header">
                        <h4>${exercise.name}</h4>
                        <span class="sets">${exercise.sets} séries x ${exercise.reps} repetições</span>
                        <button class="expand-btn"><i class="fas fa-chevron-down"></i></button>
                    </div>
                    <div class="exercise-details">
                        <img src="img/exercises/squat.svg" alt="${exercise.name}">
                        <p>${exercise.notes || 'Sem instruções específicas para este exercício.'}</p>
                        <div class="exercise-timer">
                            <span class="timer-display">00:00</span>
                            <div class="timer-controls">
                                <button class="btn btn-small start-timer" data-exercise="${exerciseId}">
                                    <i class="fas fa-play"></i> Iniciar
                                </button>
                                <button class="btn btn-small pause-timer" style="display: none;">
                                    <i class="fas fa-pause"></i> Pausar
                                </button>
                                <button class="btn btn-small reset-timer">
                                    <i class="fas fa-redo-alt"></i> Reiniciar
                                </button>
                            </div>
                        </div>
                        <div class="set-tracking">
                            <h5>Registrar Séries</h5>
                            <div class="set-records">
                                ${generateSetInputs(exercise.sets, exercise.reps, exercise.weight || 0)}
                            </div>
                            <button class="btn btn-small save-sets" data-exercise="${exerciseId}">
                                <i class="fas fa-save"></i> Salvar Séries
                            </button>
                            <div class="set-history"></div>
                        </div>
                    </div>
                `;
                
                exerciseList.appendChild(exerciseItem);
            });
            
            // Reconfigurar os ouvintes de eventos para os novos exercícios
            const newExerciseHeaders = workoutDay.querySelectorAll('.exercise-header');
            newExerciseHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const details = this.nextElementSibling;
                    const icon = this.querySelector('i');
                    const isOpen = details.classList.toggle('open');
                    
                    if (isOpen) {
                        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                    } else {
                        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                    }
                });
            });
            
            // Configurar eventos para salvar séries
            const saveSetButtons = workoutDay.querySelectorAll('.save-sets');
            saveSetButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const exerciseId = this.getAttribute('data-exercise');
                    const setContainer = this.closest('.set-tracking');
                    const inputs = setContainer.querySelectorAll('.set-input');
                    
                    // Coletar dados das séries
                    const sets = [];
                    inputs.forEach(input => {
                        const setNumber = input.getAttribute('data-set');
                        const reps = input.querySelector('.reps-done').value;
                        const weight = input.querySelector('.weight-used').value;
                        
                        if (reps) {
                            sets.push({ setNumber, reps, weight });
                        }
                    });
                    
                    // Salvar sets no histórico
                    saveSetHistory(exerciseId, sets, setContainer);
                });
            });
        }
    }
}

// Função para gerar inputs para cada série
function generateSetInputs(numSets, targetReps, defaultWeight) {
    let html = '';
    for (let i = 1; i <= numSets; i++) {
        html += `
            <div class="set-input" data-set="${i}">
                <span class="set-number">Série ${i}</span>
                <div class="set-fields">
                    <div class="reps-field">
                        <label>Reps</label>
                        <input type="number" class="reps-done" placeholder="${targetReps}" min="1">
                    </div>
                    <div class="weight-field">
                        <label>Kg</label>
                        <input type="number" class="weight-used" value="${defaultWeight}" step="0.5" min="0">
                    </div>
                </div>
            </div>
        `;
    }
    return html;
}

// Função para salvar o histórico de séries
function saveSetHistory(exerciseId, sets, container) {
    if (!sets || sets.length === 0) return;
    
    // Formatar data atual
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    
    // Criar elemento de histórico
    const historyEl = container.querySelector('.set-history');
    
    // Criar novo registro
    const recordEl = document.createElement('div');
    recordEl.classList.add('history-record');
    
    // Verificar se há tempo do cronômetro para este exercício
    let timerDisplay = 'Não registrado';
    if (window.exerciseTimer && window.exerciseTimer.timers[exerciseId]) {
        const seconds = window.exerciseTimer.timers[exerciseId].seconds;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Criar conteúdo
    let setsHTML = '<ul class="set-list">';
    sets.forEach(set => {
        setsHTML += `<li>Série ${set.setNumber}: ${set.reps} reps com ${set.weight}kg</li>`;
    });
    setsHTML += '</ul>';
    
    recordEl.innerHTML = `
        <div class="history-header">
            <span class="history-date">${dateStr} ${timeStr}</span>
            <span class="history-time">Tempo: ${timerDisplay}</span>
        </div>
        ${setsHTML}
    `;
    
    // Adicionar ao histórico
    historyEl.prepend(recordEl);
    
    // Salvar no localStorage (implementação simples)
    saveWorkoutHistory(exerciseId, {
        date: dateStr,
        time: timeStr,
        timerSeconds: window.exerciseTimer && window.exerciseTimer.timers[exerciseId] ? window.exerciseTimer.timers[exerciseId].seconds : null,
        sets: sets
    });
    
    // Mostrar confirmação
    showToast('Séries registradas com sucesso!');
}

// Função para salvar histórico no localStorage
function saveWorkoutHistory(exerciseId, data) {
    // Recuperar histórico existente
    const historyKey = `workout_history_${exerciseId}`;
    let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
    
    // Adicionar novo registro
    history.push(data);
    
    // Limitar tamanho do histórico
    if (history.length > 30) {
        history = history.slice(-30); // Mantém apenas os 30 registros mais recentes
    }
    
    // Salvar de volta no localStorage
    localStorage.setItem(historyKey, JSON.stringify(history));
}

// Função auxiliar para capitalizar a primeira letra
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Inicializar o perfil do usuário na interface
function initializeUserProfile() {
    const userAvatar = document.querySelector('.user-avatar');
    const userName = document.querySelector('.user-name');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Verificar se o auth.js está carregado e há um usuário autenticado
    if (typeof authManager !== 'undefined' && authManager.isAuthenticated) {
        // Preencher os dados do usuário
        if (userAvatar) userAvatar.src = authManager.user.profilePicture;
        if (userName) userName.textContent = authManager.user.name;
        
        // Configurar o botão de logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                authManager.logout();
            });
        }
    } else {
        // Se não tiver auth.js ou usuário, redirecionar para login
        window.location.href = 'login.html';
    }
}

// Função para atualizar os indicadores de treino nos botões dos dias da semana
function updateWorkoutIndicators() {
    // Reset de todas as indicações
    dayButtons.forEach(button => {
        button.classList.remove('has-workout');
        button.classList.remove('workout-type-full-body');
        button.classList.remove('workout-type-upper');
        button.classList.remove('workout-type-lower');
        button.classList.remove('workout-type-push');
        button.classList.remove('workout-type-pull');
        button.classList.remove('workout-type-custom');
    });
    
    // Adicionar indicação para os dias que têm treinos
    Object.keys(userData.workouts).forEach(day => {
        const workout = userData.workouts[day];
        const button = document.querySelector(`.day-btn[data-day="${day}"]`);
        
        if (button && workout) {
            // Marcar que tem treino
            button.classList.add('has-workout');
            
            // Identificar o tipo de treino pelo nome (simplificado)
            const workoutName = workout.name.toLowerCase();
            
            if (workoutName.includes('full body')) {
                button.classList.add('workout-type-full-body');
            } else if (workoutName.includes('peito') || workoutName.includes('costas') || workoutName.includes('ombros')) {
                button.classList.add('workout-type-upper');
            } else if (workoutName.includes('perna') || workoutName.includes('glúteo')) {
                button.classList.add('workout-type-lower');
            } else if (workoutName.includes('push')) {
                button.classList.add('workout-type-push');
            } else if (workoutName.includes('pull')) {
                button.classList.add('workout-type-pull');
            } else {
                button.classList.add('workout-type-custom');
            }
        }
    });
}

// Inicializa a aplicação quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', initApp);

// Adiciona o script de autenticação se ainda não estiver carregado
if (typeof authManager === 'undefined') {
    const script = document.createElement('script');
    script.src = 'js/auth.js';
    document.body.appendChild(script);
}
