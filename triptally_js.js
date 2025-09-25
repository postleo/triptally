// Global state
let currentScreen = 'start-screen';
let onboardingStep = 0;
let chatHistory = [];
let tripData = {
    name: '',
    budget: 0,
    duration: 0,
    categories: {
        dining: 0,
        accommodation: 0,
        activities: 0,
        transportation: 0
    }
};

// Onboarding conversation script
const onboardingScript = [
    {
        type: 'ai',
        message: 'Hi there! I\'m Nora, your AI travel assistant. I\'m so excited to help you plan your next adventure! 👋',
        delay: 1000
    },
    {
        type: 'ai',
        message: 'Let\'s start by setting up your first trip budget. What destination are you planning to visit?',
        delay: 2000
    },
    {
        type: 'user',
        message: 'I\'m planning a trip to Bali!',
        delay: 3500
    },
    {
        type: 'ai',
        message: 'Bali! What an amazing choice! 🌴 The beaches, temples, and local culture are incredible. How many days are you planning to stay?',
        delay: 1500
    },
    {
        type: 'user',
        message: '10 days',
        delay: 2000
    },
    {
        type: 'ai',
        message: 'Perfect! 10 days gives you plenty of time to explore. Now, what\'s your total budget for this trip?',
        delay: 1500
    },
    {
        type: 'user',
        message: '$1,200',
        delay: 2000
    },
    {
        type: 'ai',
        message: 'Great! $1,200 for 10 days in Bali is totally doable. Let me suggest how to split this budget across different categories:',
        delay: 1500
    },
    {
        type: 'ai',
        message: '🍽️ Dining: $300 (25%) - Mix of local warungs and nice restaurants<br>🏨 Accommodation: $400 (33%) - Good quality hotels or guesthouses<br>🎯 Activities: $300 (25%) - Temples, tours, and experiences<br>🚗 Transportation: $200 (17%) - Taxis, scooter rental, and airport transfers',
        delay: 2500
    },
    {
        type: 'user',
        message: 'That sounds perfect! How do I track my expenses?',
        delay: 2000
    },
    {
        type: 'ai',
        message: 'I\'ll be with you every step of the way! You can chat with me anytime to log expenses, get recommendations, or ask for budget advice. I\'ll help you stay on track and find great deals! 💡',
        delay: 2000
    },
    {
        type: 'ai',
        message: 'Your Bali adventure budget is all set up! Ready to explore your dashboard and start planning? ✈️',
        delay: 1500
    }
];

// Screen management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

function startOnboarding() {
    showScreen('onboarding-screen');
    document.getElementById('onboarding-messages').innerHTML = '';
    onboardingStep = 0;
}

function goToDashboard() {
    showScreen('main-app');
    updateDashboardWithDefaults();
}

function skipOnboarding() {
    showScreen('main-app');
    updateDashboardWithDefaults();
}

// Onboarding demo
function startDemo() {
    const startButton = document.getElementById('start-demo');
    startButton.textContent = 'Demo in Progress...';
    startButton.disabled = true;
    
    onboardingStep = 0;
    chatHistory = [];
    playNextMessage();
}

function playNextMessage() {
    if (onboardingStep >= onboardingScript.length) {
        // Demo complete
        setTimeout(() => {
            const controls = document.querySelector('.onboarding-controls');
            controls.innerHTML = `
                <button class="onboarding-btn onboarding-btn-primary" onclick="completeOnboarding()">
                    Continue to Dashboard
                </button>
                <button class="onboarding-btn onboarding-btn-secondary" onclick="restartDemo()">
                    Replay Demo
                </button>
            `;
        }, 1000);
        return;
    }

    const step = onboardingScript[onboardingStep];
    
    setTimeout(() => {
        addOnboardingMessage(step.type, step.message);
        chatHistory.push(step);
        onboardingStep++;
        playNextMessage();
    }, step.delay || 1000);
}

function addOnboardingMessage(type, message) {
    const messagesContainer = document.getElementById('onboarding-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    if (type === 'ai') {
        messageDiv.innerHTML = `<strong>Nora:</strong><br>${message}`;
    } else {
        messageDiv.innerHTML = `<strong>You:</strong><br>${message}`;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function completeOnboarding() {
    // Set up trip data from demo
    tripData = {
        name: 'Bali Getaway',
        budget: 1200,
        duration: 10,
        categories: {
            dining: 300,
            accommodation: 400,
            activities: 300,
            transportation: 200
        }
    };
    
    showScreen('main-app');
    updateDashboardWithData();
    populateChatHistory();
}

function restartDemo() {
    document.getElementById('onboarding-messages').innerHTML = '';
    document.querySelector('.onboarding-controls').innerHTML = `
        <button class="onboarding-btn onboarding-btn-primary" id="start-demo" onclick="startDemo()">
            Start Demo
        </button>
        <button class="onboarding-btn onboarding-btn-secondary" onclick="skipOnboarding()">
            Skip to Dashboard
        </button>
    `;
}

function updateDashboardWithDefaults() {
    // Set default values
    document.getElementById('total-budget').textContent = '$1,200';
    document.getElementById('spent-amount').textContent = '$485';
    document.getElementById('remaining-amount').textContent = '$715';
    document.getElementById('days-left').textContent = '7';
    document.getElementById('trip-name').textContent = 'Current Trip: Bali Getaway';
}

function updateDashboardWithData() {
    if (tripData.budget > 0) {
        document.getElementById('total-budget').textContent = `$${tripData.budget.toLocaleString()}`;
        document.getElementById('trip-name').textContent = `Current Trip: ${tripData.name}`;
        
        // Update form inputs
        document.getElementById('trip-name-input').value = tripData.name;
        document.getElementById('total-budget-input').value = tripData.budget;
        document.getElementById('duration-input').value = tripData.duration;
        document.getElementById('dining-budget').value = tripData.categories.dining;
        document.getElementById('accommodation-budget').value = tripData.categories.accommodation;
        document.getElementById('activities-budget').value = tripData.categories.activities;
        document.getElementById('transport-budget').value = tripData.categories.transportation;
    } else {
        updateDashboardWithDefaults();
    }
}

function populateChatHistory() {
    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatHistoryContainer = document.getElementById('chat-history-content');
    
    // Clear existing messages
    chatMessagesContainer.innerHTML = '';
    
    // Add welcome message
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'message ai';
    welcomeMsg.innerHTML = '<strong>Nora:</strong><br>Welcome back! Your Bali Getaway budget is all set up. I\'m here whenever you need help tracking expenses or planning activities. How can I assist you today?';
    chatMessagesContainer.appendChild(welcomeMsg);
    
    // Add history summary
    chatHistoryContainer.innerHTML = `
        <div class="expense-item">
            <div class="expense-details">
                <div class="expense-icon"><i class="fas fa-comments"></i></div>
                <div class="expense-info">
                    <h4>Onboarding Conversation</h4>
                    <p>Budget setup for ${tripData.name} - ${tripData.duration} days, $${tripData.budget} total</p>
                </div>
            </div>
            <div class="expense-amount">Complete</div>
        </div>
    `;
}

// Navigation back to main app
function goToMainApp() {
    // In a real integration, this would navigate back to Tripflow
    alert('This would navigate back to the main Tripflow app. In the demo, this just shows an alert.');
    // Example: window.location.href = '/tripflow' or window.parent.postMessage('navigate-to-tripflow', '*');
}

// Navigation back to main app
function goToMainApp() {
    // In a real integration, this would navigate back to Tripflow
    alert('This would navigate back to the main Tripflow app. In the demo, this just shows an alert.');
    // Example: window.location.href = '/tripflow' or window.parent.postMessage('navigate-to-tripflow', '*');
}

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggles = document.querySelectorAll('.theme-toggle i, .theme-toggle-start i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggles.forEach(toggle => toggle.className = 'fas fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggles.forEach(toggle => toggle.className = 'fas fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Page Navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
}

// Add expense functionality
function addExpense() {
    alert('Expense added successfully! This would integrate with your budget tracking.');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.querySelectorAll('.theme-toggle i, .theme-toggle-start i').forEach(toggle => {
            toggle.className = 'fas fa-sun';
        });
    }
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) &&
        sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});