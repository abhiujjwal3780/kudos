This is the React client for the Kudos application, which allows users to give, view, and manage kudos within their organization.

## Features

- **Dashboard:** Overview of latest kudos, assignments, and quick actions.
- **Give Kudos:** Send kudos to your peers with a message, level, and points.
- **View Kudos:** See all kudos in your organization, filter and search.
- **My Kudos:** View kudos you have received.
- **Kudos Assignments:** Assign kudos tasks to users for a specific period.

- **Responsive UI:** Modern, mobile-friendly design.

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh

    cd kudos/client/kudos
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. in constant file update according to your backend url
    ```
    REACT_APP_API_URL=http://localhost:8000
    ```

### Running the App

```sh
npm start
# or
yarn start
```

The app will run at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  components/
    common/           # Reusable components (tables, navbar, etc.)
    give_kudos_card/  # Give Kudos card component
    create_kudos/     # Kudos creation form
    create_kudos_assignment/ # Kudos assignment form
    kudos_card/       # Kudos display card
    kudos_assignment/ # Assignment info card
  pages/
    dashboard/        # Dashboard page
    kudos/            # Main kudos navigation page
    show_all_kudos/   # All kudos table and filter
  store/              # Context and state management
  hooks/              # Custom hooks (API, debounce, etc.)
  config.js           # Navigation and config
  constants.js        # API endpoints and constants
```

## Customization

- **API Endpoints:** Update `src/constants.js` if your backend endpoints change.
- **Navigation:** Edit `src/config.js` for nav items.
- **Styling:** All components use modular CSS files for easy customization.

## Useful Scripts

- `npm run lint` — Lint your code.
- `npm run build` — Build for production.

## Feedback & Contributions

Feel free to open issues or pull requests for improvements!

---

**Enjoy spreading positivity with Kudos!**