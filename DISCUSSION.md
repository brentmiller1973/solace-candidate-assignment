# Solace Patient Advocate Directory
This is my implementation for the Solace  Engineering Assignment.  The last section of this documet "Discussion" goes over everything I did, broken down by pull requests. Enjoy!

## Getting Started

### Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v22 or higher)
- **Docker** 

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd solace-candidate-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the database**
   
   Start the PostgreSQL database using Docker Compose:
   ```bash
   docker-compose up -d
   ```
   
   This will start a PostgreSQL container with the following default credentials:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `solaceassignment`
   - **Username**: `postgres`
   - **Password**: `password`

4. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with the database connection (using Docker defaults):
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/solaceassignment"
   ```
   
   **Note**: If you're using a different PostgreSQL setup, replace the credentials accordingly.

5. **Database Setup**
   
   Generate database schema:
   ```bash
   npm run generate
   ```
   
   Run database migrations:
   ```bash
   npm run migrate:up
   ```
   
   Seed the database with sample data:
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```
   *(Note: Run this after starting the development server)*

6. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:3000`

### Verification

- **Homepage**: Navigate to `http://localhost:3000` to see the advocate search interface
- **API Health**: Visit `http://localhost:3000/api/advocates` to verify the API is working
- **Database**: Search for advocates to confirm data is properly seeded

---

## 📜 Available Scripts

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Next.js development server on `http://localhost:3000` |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Starts the production server (requires `npm run build` first) |

### Code Quality & Formatting

| Command | Description |
|---------|-------------|
| `npm run lint` | Runs ESLint to check for code quality issues |
| `npm run lint:fix` | Automatically fixes ESLint issues where possible |
| `npm run format` | Formats code using Prettier |
| `npm run format:check` | Checks if code is properly formatted (CI/CD friendly) |

### Testing

| Command | Description |
|---------|-------------|
| `npm run test` | Runs all Jest tests once |
| `npm run test:watch` | Runs tests in watch mode (re-runs on file changes) |
| `npm run test:coverage` | Runs tests and generates coverage report |

### Database Operations

| Command | Description |
|---------|-------------|
| `npm run generate` | Generates database migration files from schema changes |
| `npm run migrate:up` | Applies pending database migrations |
| `npm run seed` | Seeds database with sample advocate data (alternative to API endpoint) |

### Storybook (Component Documentation)

| Command | Description |
|---------|-------------|
| `npm run storybook` | Starts Storybook development server on `http://localhost:6006` |
| `npm run build-storybook` | Builds static Storybook for deployment |

---

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Drizzle ORM
- **Testing**: Jest + React Testing Library
- **Documentation**: Storybook
- **Code Quality**: ESLint + Prettier

### Key Features
- **Server-side search & pagination** for optimal performance
- **Advanced filtering** by name, location, specialty, and experience
- **Responsive design** with mobile-first approach
- **Accessibility compliance** (WCAG 2.1 AA)
- **Browser history support** with URL-based state management
- **Comprehensive testing** with 161 unit tests
- **Component documentation** via Storybook

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
├── db/                     # Database schema and utilities
├── lib/                    # Shared utilities and helpers
├── models/                 # TypeScript type definitions
└── stories/                # Storybook component stories
```

---

## Development Workflow

### Typical Development Session

1. **Start development server**: `npm run dev`
2. **Run tests in watch mode**: `npm run test:watch`
3. **View components in Storybook**: `npm run storybook`
4. **Make changes and verify**:
   - Code automatically reloads in browser
   - Tests re-run on file changes
   - Storybook updates component documentation

### Before Committing

1. **Format code**: `npm run format`
2. **Check linting**: `npm run lint`
3. **Run full test suite**: `npm run test`
4. **Verify build**: `npm run build`

### Database Changes

1. **Update schema**: Modify files in `src/db/schema.ts`
2. **Generate migration**: `npm run generate`
3. **Apply migration**: `npm run migrate:up`
4. **Re-seed if needed**: `curl -X POST http://localhost:3000/api/seed`

---

## Troubleshooting

### Common Issues

**Database connection errors**:
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env.local`
- Ensure database exists and is accessible

**Build failures**:
- Run `npm run lint` to check for code issues
- Run `npm run format` to fix formatting
- Check TypeScript errors with `npx tsc --noEmit`

**Missing data**:
- Re-seed database: `curl -X POST http://localhost:3000/api/seed`
- Check API endpoint: `http://localhost:3000/api/advocates`

**Port conflicts**:
- Next.js dev server: Change port with `npm run dev -- -p 3001`
- Storybook: Change port with `npm run storybook -- -p 6007`

### Getting Help

- Check the browser console for JavaScript errors
- Review the terminal output for server-side errors
- Use the Storybook documentation for component usage
- Run tests to verify functionality: `npm run test`

## Discussion
I have really enjoyed building this.  Its not perfect however. If given more time, some of the things I would have loved to added:
1. More refinement to the UX
2. AI help integration (See: https://www.assistant-ui.com/examples/modal)
3. Better code organization.
4. setting up Chromatic for Storybook and being able to showcase visual regression testing.
5. More performance testing and optomization.

With that said, I am pretty happy where this is at.  Below are the PR's I created, along with a description of what was done

### General front-end cleanup and gitignore updated:  [https://github.com/brentmiller1973/solace-candidate-assignment/pull/1](https://github.com/brentmiller1973/solace-candidate-assignment/pull/1)

This is my initial PR to clean up the project a bit before really digging in.  There were some hydration errors that needed to be fixed; the biggest offenders being a malformed HTML table header (no table row) and no keys being present in the list of data that creates the table rows.  Also did some initial refactoring to use a model of the Advocate object to suppress TS warnings, prevent direct DOM manipulation  for the search input.  Also, I updated the .gitignore to prevent unwanted files and secrets from being added to source control.

Here is a detailed list of what was done:

Summary of Fixes by Category

#### Hydration  / React Issues:

**Added client-side rendering guard** - Added `isClient` state to prevent hydration mismatches

**Wrapped input in conditional rendering** - `{isClient && <input />}` to render only after hydration

**Replaced DOM manipulation with React state** - Removed `document.getElementById()` and used `searchTerm` state instead

**Added missing React keys** - Used composite keys `${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}` for a react key in the table rows.  **Note: This is temporary!  Once the database is configured, the record ID will be used instead.**

**Made input a controlled component** - Added `value={searchTerm}` to properly control the search input in a "React way" instead of using low-level DOM manipulation.

**Fixed search function TypeError** - Changed `advocate.yearsOfExperience.includes()` to `advocate.yearsOfExperience?.toString().includes()`.  Also added null safety with optional chaining, case-insensitive search, and proper array handling with the specialties array `specialties?.some()`

#### TypeScript Issues

**Created dedicated model file** - Created [Advocate](cci:2://file:///Users/bmiller/work/solace-candidate-assignment/src/models/advocate.ts:0:0-8:1) interface in [/src/models/advocate.ts](cci:7://file:///Users/bmiller/work/solace-candidate-assignment/src/models/advocate.ts:0:0-0:0) and then used it in page.tsx

**Added proper event typing** - Used `React.ChangeEvent<HTMLInputElement>` for onChange handler

**Added state type annotations** - Explicitly typed all useState hooks with proper types

#### .gitignore
Updated .gitignore file to prevent unwanted directories (node_modules, IDE, etc) and secrets from being added.


### Upgraded to tailwind 4: [https://github.com/brentmiller1973/solace-candidate-assignment/pull/2](https://github.com/brentmiller1973/solace-candidate-assignment/pull/2)

To be honest, I am not a fan of CSS frameworks anymore.  I believe with the introduction and wide-spread adoption of flex, grid, nesting, and especially custom CSS properties, we already have everything we need to create a well crafted styling solution.  With that said, time is money and not every developer has not been able to put in the time to learn everything CSS has to offer and create a well crafted, atomic cascading design system.  Therefore, Tailwind, despite it "polluting the DOM" is an acceptable framework and is heavily used by many developers today.

This application was initially using Tailwind 3.x and I have decided to upgrade it to the latest version of Tailwind 4 for the following reasons:

*   **Faster Build Times:** Tailwind 4.x features a new Rust-powered engine that significantly speeds up both full and incremental builds.
*   **Simplified Configuration:** It moves towards a CSS-first configuration (like using custom CSS properties), allowing you to define themes and custom utilities directly in CSS, eliminating the need for a `tailwind.config.js` file.  In terms of web development, I am a big fan of "Use the platform" and by that I mean use what the browser gives you so that you minimize abstractions and hard upgrade paths.  In terms of CSS, Tailwind 4 is using the "platform" more.
*   **Streamlined Installation:** The setup process is simpler with fewer dependencies and built-in handling of imports and vendor prefixes, reducing the need for external PostCSS plugins.
*   **Modern CSS Feature Support:** Tailwind 4.x natively supports advanced CSS features like container queries, cascade layers, `color-mix()`, and registered custom properties.
*   **Enhanced Design Capabilities:** It offers expanded gradient APIs (conic, radial, angles), new 3D transform utilities, and a modernized P3 color palette for more vivid designs.
*   **Improved Developer Experience:** Dynamic utility values allow for arbitrary values without prior configuration, and automatic content detection simplifies file scanning.
*   **New Variants:** Introduces useful variants like `@starting-style` for animations and `not-*` for negating CSS pseudo-classes and media queries.

I followed the upgrade page here:  [https://tailwindcss.com/docs/upgrade-guide](https://tailwindcss.com/docs/upgrade-guide)

### UX Facelift:  [https://github.com/brentmiller1973/solace-candidate-assignment/pull/3](https://github.com/brentmiller1973/solace-candidate-assignment/pull/3)

This pull request delivers significant enhancements to the advocate search experience, alongside crucial UI and performance optimizations.

#### Key Highlights:

*   **Advanced Search Implementation:** Introduced a robust advanced search feature, empowering users with more refined and precise search capabilities to quickly find the right advocates.
*   **Tailwind 4 & Design System Alignment:** Developed a custom Tailwind 4 theme, meticulously crafted by referencing the company's design language on [Solace Health](https://www.solace.health/). This ensures a cohesive and on-brand user experience, complemented by best practices from my design experience.
*   **Component Reusability:** Initiated the modularization of the application by breaking down key functionalities into reusable React components, laying the groundwork for improved maintainability and scalability.
*   **Accessibility & Responsiveness:** Prioritized user experience across devices and for all users. The application has been made fully responsive and rigorously tested for accessibility compliance using Chrome Lighthouse and keyboard-only navigation.
*   **Performance Optimization:** Implemented lazy loading for the list view using React Suspense. This strategic optimization ensures a faster initial load time, as the card view remains the default display for search results.

### Linting:  [https://github.com/brentmiller1973/solace-candidate-assignment/pull/4](https://github.com/brentmiller1973/solace-candidate-assignment/pull/4)

Extended a bit default linting and added prettier. Ran commands and corrected findings.  I was tempted to give Biome [https://biomejs.dev/](https://biomejs.dev/) a shot instead but since I have not used it yet, wasn't sure if all the features for this project were covered.

### Unit testing and CI:  [https://github.com/brentmiller1973/solace-candidate-assignment/pull/5](https://github.com/brentmiller1973/solace-candidate-assignment/pull/5)

- Added unit testing setup with Jest.
- Created tests for each of the components in the component directory and ensure they all passed and where set up properly.
- Added GitHub CI integration so all future pull requests will require passing of the linting and test scripts.

### Test GitHub Actions are working properly:  [https://github.com/brentmiller1973/solace-candidate-assignment/pull/6](https://github.com/brentmiller1973/solace-candidate-assignment/pull/6)

Just a test PR to ensure GitHub actions for linting and testing are running and passing.

### Added Storybook and stories:  [https://github.com/brentmiller1973/solace-candidate-assignment/pull/7](https://github.com/brentmiller1973/solace-candidate-assignment/pull/7)

This adds Storybook (https://storybook.js.org/) to the project.  Storybook is an excellent way to ensure the design system is consistent and for regression testing.  If this was a production application, this storybook integration would be pushed to https://www.chromatic.com/storybook for excellent visual regression monitoring.  All components as well as typography have been covered in this pull request

### Backend, pagination, a11y, and final cleanup:  [https://github.com/brentmiller1973/solace-candidate-assignment/pull/8](https://github.com/brentmiller1973/solace-candidate-assignment/pull/8)

This should have been multiple PR's, aplogies!  This PR moved off the static data and onto the database.  I changed the schema a bit. First I added id's to the advocate table. I specifically wanted the id's for React keys.  I also added a specialties table as well as a union table between the two.  I updated the API to work with pagination.  On the UI side, I implemented pagination along with browser history. I implemented better logging than using console statements.  Finally I added much needed WCAG a11y elements such as aria tags and skip link.  Finally I tried to optomize a bit...bring in specialities on the server and cache, use suspense on the results, reduce page flicker to be more SPA like.
