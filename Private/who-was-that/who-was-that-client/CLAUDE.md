# Claude AI Development Guidelines

## Project Overview

This is the `who-was-that-client` project - a Next.js + TypeScript frontend application for the "Who Was That?" application.

## Working with Claude

### Code Review and Suggestions

- Claude can help review React/Next.js code for best practices
- Ask for optimization suggestions for performance and bundle size
- Request security review for client-side authentication and data handling
- Get suggestions for accessibility improvements and UX enhancements

### Development Tasks

- React component design and implementation
- Next.js routing and page structure
- TypeScript type definitions and interfaces
- State management with Redux Toolkit
- AWS Amplify integration and authentication
- Testing strategies for components and user interactions
- Responsive design and mobile optimization

### Frontend-Specific Areas

- React hooks and component lifecycle
- Next.js App Router and server components
- TypeScript best practices and type safety
- Performance optimization (code splitting, lazy loading)
- CSS/Tailwind styling and responsive design
- Browser compatibility and polyfills

### Architecture Discussions

- Component composition and reusability
- State management patterns (local vs global state)
- API integration and data fetching strategies
- Client-side routing and navigation
- Authentication flow and protected routes
- Error handling and user feedback

## Code Standards

- Follow the `.cursorrules` file for coding standards
- Maintain high test coverage with Jest and React Testing Library
- Use meaningful commit messages
- Keep components small and focused
- Document complex business logic and custom hooks

## Security Considerations

- Client-side authentication with AWS Cognito
- Secure storage of tokens and sensitive data
- Input validation and sanitization
- HTTPS enforcement and secure headers
- Environment variable handling
- XSS prevention and content security policy

## Performance Guidelines

- Next.js Image optimization
- Code splitting and lazy loading
- Bundle size optimization
- Runtime performance monitoring
- Core Web Vitals optimization
- Caching strategies (static and dynamic)

## Accessibility

- WCAG compliance and semantic HTML
- Keyboard navigation support
- Screen reader compatibility
- Focus management and tab order
- Color contrast and visual accessibility
- Alternative text for images and icons

## Testing Strategy

- Unit tests for components and hooks
- Integration tests for user flows
- Visual regression testing with Storybook
- Accessibility testing
- Performance testing and monitoring

## Documentation

- Keep README.md updated with setup instructions
- Document component props and usage in Storybook
- Maintain changelog for releases
- Include API integration examples
- Document deployment and build processes
