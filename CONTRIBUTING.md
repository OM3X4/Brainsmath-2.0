# Contributing to BrainsMath

Thank you for your interest in contributing to BrainsMath! This guide will help you understand the project structure and how to contribute effectively.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Feature Development](#feature-development)
- [Bug Reports](#bug-reports)
- [Documentation](#documentation)

## Project Overview

BrainsMath is a modern web application built with Next.js that helps users practice and improve their mental math skills. The application features:

- Multiple math operation types (addition, subtraction, multiplication, roots, squares)
- Different difficulty levels
- User authentication
- Progress tracking
- Customizable themes

## Tech Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Authentication**: Custom implementation
- **Deployment**: Netlify

## Getting Started

1. **Fork the repository**
2. **Clone your fork**

   ```bash
   git clone https://github.com/OM3X4/Brainsmath-2.0.git
   cd brainsmath2.0
   ```
3. **Install dependencies**

   ```bash
   npm install
   ```
4. **Start the development server**

   ```bash
   npm run dev
   ```
5. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
app/
├── Components/         # Reusable UI components
├── context/           # React context providers
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── authentication/   # Authentication related pages
├── profile/          # User profile pages
├── settings/         # Application settings
├── globals.css       # Global styles
└── page.tsx          # Main application page
```

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Use meaningful variable and function names
- Add appropriate comments for complex logic
- Keep components small and focused

### Component Development

- Create components in the `app/Components` directory
- Use functional components with hooks
- Implement proper TypeScript types
- Follow the existing styling patterns using Tailwind CSS

### State Management

- Use React Context for global state
- Keep component state local when possible
- Follow the existing context patterns

### Testing

- Write tests for new features
- Ensure existing tests pass
- Test across different screen sizes

## Pull Request Process

1. Create a new branch for your feature/fix

   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit them

   ```bash
   git commit -m "Description of your changes"
   ```
3. Push to your fork

   ```bash
   git push origin feature/your-feature-name
   ```
4. Create a Pull Request

   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots for UI changes

## Feature Development

### Adding New Math Operations

1. Update types in `app/types/types.ts`
2. Add generation logic in `app/utils/questionGen.ts`
3. Update UI components to support the new operation
4. Add appropriate tests

### Theme Development

1. Add new theme variables in `app/globals.css`
2. Update theme selection components
3. Test across different components

### Authentication

- Follow the existing authentication patterns
- Implement proper security measures
- Handle edge cases appropriately

## Bug Reports

When reporting bugs:

1. Use the issue template
2. Provide steps to reproduce
3. Include expected vs actual behavior
4. Add relevant screenshots
5. Specify your environment details

## Documentation

- Keep documentation up to date
- Add comments for complex logic
- Update README.md for major changes
- Document new features thoroughly

## Questions?

Feel free to open an issue if you have any questions about contributing to the project. We're happy to help!

---

Thank you for contributing to BrainsMath! 🚀
