// Cronômetro para exercícios
class ExerciseTimer {
    constructor() {
        this.timers = {};
        this.interval = null;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Evento para iniciar o cronômetro
        document.addEventListener('click', (event) => {
            if (event.target.closest('.start-timer')) {
                const button = event.target.closest('.start-timer');
                const exerciseId = button.getAttribute('data-exercise');
                const timerDisplay = button.closest('.exercise-timer').querySelector('.timer-display');
                const pauseButton = button.closest('.timer-controls').querySelector('.pause-timer');
                
                button.style.display = 'none';
                pauseButton.style.display = 'inline-flex';
                
                this.startTimer(exerciseId, timerDisplay);
            }
        });
        
        // Evento para pausar o cronômetro
        document.addEventListener('click', (event) => {
            if (event.target.closest('.pause-timer')) {
                const button = event.target.closest('.pause-timer');
                const exerciseId = button.closest('.timer-controls').querySelector('.start-timer').getAttribute('data-exercise');
                const startButton = button.closest('.timer-controls').querySelector('.start-timer');
                
                button.style.display = 'none';
                startButton.style.display = 'inline-flex';
                startButton.innerHTML = '<i class="fas fa-play"></i> Continuar';
                
                this.pauseTimer(exerciseId);
            }
        });
        
        // Evento para reiniciar o cronômetro
        document.addEventListener('click', (event) => {
            if (event.target.closest('.reset-timer')) {
                const button = event.target.closest('.reset-timer');
                const exerciseId = button.closest('.timer-controls').querySelector('.start-timer').getAttribute('data-exercise');
                const timerDisplay = button.closest('.exercise-timer').querySelector('.timer-display');
                const startButton = button.closest('.timer-controls').querySelector('.start-timer');
                const pauseButton = button.closest('.timer-controls').querySelector('.pause-timer');
                
                startButton.style.display = 'inline-flex';
                startButton.innerHTML = '<i class="fas fa-play"></i> Iniciar';
                pauseButton.style.display = 'none';
                
                this.resetTimer(exerciseId, timerDisplay);
            }
        });
    }
    
    startTimer(exerciseId, displayElement) {
        // Se o timer não existir, crie-o
        if (!this.timers[exerciseId]) {
            this.timers[exerciseId] = {
                seconds: 0,
                running: false,
                display: displayElement
            };
        }
        
        // Define o timer como em execução
        this.timers[exerciseId].running = true;
        
        // Se não houver intervalo ativo, inicie um
        if (this.interval === null) {
            this.interval = setInterval(() => {
                this.updateTimers();
            }, 1000);
        }
    }
    
    pauseTimer(exerciseId) {
        if (this.timers[exerciseId]) {
            this.timers[exerciseId].running = false;
            
            // Verifica se há algum timer em execução
            const anyRunning = Object.values(this.timers).some(timer => timer.running);
            
            // Se não houver nenhum timer em execução, pare o intervalo
            if (!anyRunning && this.interval !== null) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    }
    
    resetTimer(exerciseId, displayElement) {
        if (this.timers[exerciseId]) {
            this.timers[exerciseId].seconds = 0;
            this.timers[exerciseId].running = false;
            displayElement.textContent = '00:00';
            
            // Verifica se há algum timer em execução
            const anyRunning = Object.values(this.timers).some(timer => timer.running);
            
            // Se não houver nenhum timer em execução, pare o intervalo
            if (!anyRunning && this.interval !== null) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    }
    
    updateTimers() {
        for (const exerciseId in this.timers) {
            const timer = this.timers[exerciseId];
            
            if (timer.running) {
                timer.seconds++;
                
                const minutes = Math.floor(timer.seconds / 60);
                const seconds = timer.seconds % 60;
                
                timer.display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }
    }
    
    // Método para salvar o tempo de um exercício
    saveExerciseTime(exerciseId, note) {
        if (this.timers[exerciseId]) {
            const timeInSeconds = this.timers[exerciseId].seconds;
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;
            const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Aqui você pode implementar a lógica para salvar o tempo no histórico
            console.log(`Exercício ${exerciseId}: ${formattedTime} - ${note}`);
            
            // Retorna o tempo formatado
            return formattedTime;
        }
        return null;
    }
}

// Inicializa o cronômetro global
const exerciseTimer = new ExerciseTimer();

// Exporta a instância para uso global
window.exerciseTimer = exerciseTimer;
