/**
 * auth.js - Gerenciamento de autenticação para FitLife
 * Sistema de autenticação com email/senha e Google
 */

// Constantes para armazenamento local
const AUTH_TOKEN_KEY = 'fitlife_auth_token';
const USER_DATA_KEY = 'fitlife_user_data';

// Classe para gerenciar autenticação
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
        
        // Inicialização
        this.init();
        
        // Eventos dos formulários
        this.setupEventListeners();
    }
    
    // Inicializa o sistema de autenticação
    init() {
        // Verificar se há token salvo
        const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);
        const savedUserData = localStorage.getItem(USER_DATA_KEY);
        
        if (savedToken && savedUserData) {
            try {
                this.token = savedToken;
                this.user = JSON.parse(savedUserData);
                this.isAuthenticated = true;
                
                // Verificar se estamos na página de login e redirecionar se já autenticado
                if (window.location.pathname.includes('login.html')) {
                    window.location.href = 'index.html';
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
                this.logout();
            }
        } else if (!window.location.pathname.includes('login.html') && !this.isAuthenticated) {
            // Redirecionar para login se não autenticado
            window.location.href = 'login.html';
        }
    }
    
    // Configurar ouvintes de eventos
    setupEventListeners() {
        // Formulário de login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                const rememberMe = document.getElementById('rememberMe').checked;
                
                this.loginWithEmail(email, password, rememberMe);
            });
        }
        
        // Formulário de cadastro
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                this.register(name, email, password, confirmPassword);
            });
        }
        
        // Login com Google
        const googleLoginButtons = document.querySelectorAll('.google-login');
        if (googleLoginButtons) {
            googleLoginButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.loginWithGoogle();
                });
            });
        }
    }
    
    // Login com email e senha
    loginWithEmail(email, password, rememberMe) {
        // Simulação de login (em um app real, isso seria uma requisição para um servidor)
        if (email && password) {
            // Simula uma verificação de credenciais
            setTimeout(() => {
                // Cria um token simulado
                const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
                
                // Cria dados de usuário simulados
                const userData = {
                    id: 'user-' + Math.random().toString(36).substring(2),
                    name: email.split('@')[0],
                    email: email,
                    profilePicture: 'https://ui-avatars.com/api/?name=' + email.split('@')[0] + '&background=e53935&color=fff'
                };
                
                // Salva os dados
                this.setAuthData(mockToken, userData, rememberMe);
                
                // Redireciona para a página principal
                window.location.href = 'index.html';
            }, 1000);
            
            // Mostra um indicador de carregamento
            this.showLoading('loginForm');
        }
    }
    
    // Registro de novo usuário
    register(name, email, password, confirmPassword) {
        // Validações básicas
        if (!name || !email || !password || !confirmPassword) {
            this.showError('Todos os campos são obrigatórios');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showError('As senhas não coincidem');
            return;
        }
        
        if (password.length < 6) {
            this.showError('A senha deve ter pelo menos 6 caracteres');
            return;
        }
        
        // Simulação de registro (em um app real, isso seria uma requisição para um servidor)
        setTimeout(() => {
            // Cria um token simulado
            const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
            
            // Cria dados de usuário simulados
            const userData = {
                id: 'user-' + Math.random().toString(36).substring(2),
                name: name,
                email: email,
                profilePicture: 'https://ui-avatars.com/api/?name=' + name.replace(' ', '+') + '&background=e53935&color=fff'
            };
            
            // Salva os dados
            this.setAuthData(mockToken, userData, true);
            
            // Redireciona para a página principal
            window.location.href = 'index.html';
        }, 1500);
        
        // Mostra um indicador de carregamento
        this.showLoading('registerForm');
    }
    
    // Login com Google
    loginWithGoogle() {
        // Em um app real, isso utilizaria a API do Google para autenticação
        // Aqui apenas simulamos o login
        
        setTimeout(() => {
            // Cria um token simulado
            const mockToken = 'google-mock-token-' + Math.random().toString(36).substring(2);
            
            // Cria dados de usuário simulados do Google
            const userData = {
                id: 'google-user-' + Math.random().toString(36).substring(2),
                name: 'Usuário Google',
                email: 'usuario@gmail.com',
                profilePicture: 'https://ui-avatars.com/api/?name=Google+User&background=DB4437&color=fff'
            };
            
            // Salva os dados
            this.setAuthData(mockToken, userData, true);
            
            // Redireciona para a página principal
            window.location.href = 'index.html';
        }, 1500);
        
        // Mostra uma mensagem
        this.showInfo('Conectando com o Google...');
    }
    
    // Salva os dados de autenticação
    setAuthData(token, userData, remember) {
        this.token = token;
        this.user = userData;
        this.isAuthenticated = true;
        
        // Salvar no localStorage se remember for true
        if (remember) {
            localStorage.setItem(AUTH_TOKEN_KEY, token);
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        } else {
            // Use sessionStorage para manter apenas durante a sessão
            sessionStorage.setItem(AUTH_TOKEN_KEY, token);
            sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        }
    }
    
    // Logout do usuário
    logout() {
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        
        // Limpa os dados armazenados
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        sessionStorage.removeItem(USER_DATA_KEY);
        
        // Redireciona para a página de login
        window.location.href = 'login.html';
    }
    
    // Utilitários para UI
    showLoading(formId) {
        const form = document.getElementById(formId);
        if (form) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processando...';
            }
        }
    }
    
    showError(message) {
        // Implementação simples usando alert
        // Em um app real, isso seria um toast ou notificação melhor
        alert('Erro: ' + message);
    }
    
    showInfo(message) {
        // Implementação simples usando alert
        // Em um app real, isso seria um toast ou notificação melhor
        alert('Informação: ' + message);
    }
}

// Inicializa o gerenciador de autenticação
const authManager = new AuthManager();
