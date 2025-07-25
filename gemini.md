
# Gemini CLI Project Configuration

This document provides the Gemini CLI with the necessary context about this project's architecture, conventions, and core technologies. Please adhere to these guidelines when generating or modifying code.

## 1. Core Technologies

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Language**: TypeScript
- **UI Framework**: [Nuxt UI](https://ui.nuxt.com/) (built on top of Tailwind CSS)
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Lucia](https://lucia-auth.com/) via `nuxt-auth-utils`
- **Deployment**: [NuxtHub](https://hub.nuxt.com/)
- **Package Manager**: pnpm

## 2. Project Structure

The project follows a standard Nuxt 3 directory structure.

- `app/`: Contains the Vue.js frontend application.
  - `components/`: Reusable Vue components.
  - `layouts/`: Application layouts.
  - `pages/`: Application pages and routes.
  - `assets/`: Static assets like CSS and images.
  - `middleware/`: Route middleware for authentication and authorization.
- `server/`: Contains the Nitro server-side logic.
  - `api/`: API endpoints.
  - `database/`: Drizzle ORM schema (`schema.ts`) and migrations.
  - `routes/`: Server-side routes, especially for OAuth callbacks.
  - `utils/`: Server-side utility functions.
- `nuxt.config.ts`: The central configuration file for Nuxt.
- `package.json`: Project dependencies and scripts.
- `drizzle.config.ts`: Configuration for Drizzle ORM migrations.

## 3. Coding Conventions & Best Practices

- **State Management**: Use Nuxt 3's built-in composables (`useState`, `useFetch`, etc.) for state management.
- **Styling**: Utilize Nuxt UI components and Tailwind CSS utility classes for styling. Avoid writing custom CSS where possible.
- **Database**:
    - Define all database tables within `server/database/schema.ts`.
    - Generate migrations using `pnpm db:generate` after any schema change.
    - Use the Drizzle client available through server-side context for all database queries.
- **API Endpoints**:
    - Place all API endpoints under `server/api/`.
    - Follow the file-based routing system of Nitro.
    - Use `valibot` for input validation on API endpoints.
- **Authentication**:
    - Leverage `nuxt-auth-utils` for session management and user authentication.
    - Protect pages by adding the `auth` middleware in the page component: `definePageMeta({ middleware: 'auth' })`.
    - Access user session data via the `useUserSession()` composable.
- **Dependencies**: Add new dependencies using `pnpm`.

By following these guidelines, you can ensure that any changes you make are consistent with the project's established architecture and style.
