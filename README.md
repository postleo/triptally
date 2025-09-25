
This is a functional demo of Triptally, an AI-powered travel budget tracking application. The demo showcases the core user interface, navigation flow, and key features of the proposed application through a browser-based prototype.

## What Triptally Does

Triptally is designed to be a smart travel budget companion that transforms expense tracking from passive logging into active financial guidance. The application provides real-time spending advice through an AI assistant named Nora, who understands travel contexts and helps users make better spending decisions during their trips.

### Key Features Demonstrated

**Dashboard Overview**
- Real-time budget status with visual progress indicators
- Category-based spending breakdown (dining, accommodation, activities, transportation)
- Trip progress tracking with days remaining and budget utilization

**AI Assistant Integration**
- Interactive onboarding with Nora, the AI travel assistant
- Contextual conversation flow for budget setup
- Simulated intelligent responses based on trip planning context

**Budget Management**
- Trip setup with customizable budget categories
- Expense tracking interface with quick entry forms
- Visual feedback on spending patterns and budget health

**Daily Briefings**
- Personalized travel updates combining budget status with activity planning
- Weather-aware spending suggestions
- Historical briefing access

**Integration Design**
- Streamlined navigation back to main travel planning application
- Demonstration of companion app workflow
- Seamless handoff between planning and budget tracking

## Demo Features

### Interactive Elements
- **Onboarding Flow**: Complete demo conversation with AI assistant
- **Theme Toggle**: Light/dark mode switching
- **Responsive Design**: Mobile-optimized interface with collapsible sidebar
- **Page Navigation**: Full application flow between dashboard, budget setup, expenses, and briefings

### Simulated Data
- Pre-populated Bali trip example with realistic budget allocations
- Sample expense entries with categories and timestamps
- Progress indicators showing 40% budget utilization
- Mock daily briefings with contextual travel advice

### Technical Implementation
- **Frontend Only**: Pure HTML, CSS, and JavaScript implementation
- **No Backend Required**: All functionality runs in browser
- **Progressive Web App**: Service worker ready for offline capabilities
- **Modern CSS**: Custom properties for theming and responsive design

## Demo Structure

```
triptally-demo/
├── index.html          # Main demo file
├── styles.css          # Application styling (if separated)
├── script.js           # Demo functionality (if separated)
└── README.md          # This documentation
```

## Running the Demo

### Simple Setup
1. Download or clone the demo files
2. Open `index.html` in a web browser
3. No server or installation required

### Development Server (Optional)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

### Demo Navigation
1. **Start Screen**: Choose between onboarding demo or direct dashboard access
2. **Onboarding**: Experience the AI-guided budget setup process
3. **Dashboard**: Explore the main application interface
4. **Navigation**: Use sidebar to switch between different app sections
5. **Integration**: Test the "Back to Tripflow" navigation concept

## Design Concepts Demonstrated

### User Experience Flow
- **Seamless Integration**: Shows how budget tracking connects to trip planning
- **AI-First Approach**: Demonstrates conversational interface for complex budget setup
- **Mobile Optimization**: Touch-friendly interface designed for travel scenarios
- **Progressive Disclosure**: Information layered appropriately for different user needs

### Technical Architecture Preview
- **Component Structure**: Modular page organization
- **State Management**: Demo shows how data flows between screens
- **Integration Points**: API-ready design for external service connections
- **Scalable Styling**: CSS custom properties enable easy theming and customization


### Next Steps
This demo serves as a foundation for full application development, providing:
- **Visual Design System**: Established colors, typography, and component styles
- **Interaction vizualization**: User flows and navigation concepts
- **Technical Foundation**: Scalable code structure ready for backend integration
- **User Validation**: Testable prototype for gathering user feedback
