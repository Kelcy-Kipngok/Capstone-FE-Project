📚 Book Explorer — React Application
🔍 Overview

Book Explorer is a responsive web application built with React that allows users to search for books by title, author, or category using the Open Library API.
It includes a user authentication system (login/signup), a favorites feature, and protected routes to ensure only logged-in users can access the main content.

The app aims to provide an intuitive and visually appealing interface for discovering and managing books of interest.

🧠 Features
🔐 Authentication

Users can sign up and log in using a simple form interface.

Session is persisted via localStorage.

Displays a personalized greeting — “Welcome, username” — when logged in.

Only logged-in users can access book listings, favorites, and details pages.

📖 Book Search

Search by title or author.

Filter books by category (Fiction, Science, Fantasy, History, Biography).

Paginated results using the Open Library API.

Displays book covers, authors, publishers, and publication years.

❤️ Favorites

Add or remove books from a Favorites List.

Favorites are stored locally to persist even after refresh.

Access favorites easily via a dedicated page.

🧭 Navigation

Responsive Header and Footer components.

Dynamic search bar that hides on login/signup pages.

Logo click redirects to the correct page depending on login state.

Protected routes ensure only authenticated users can view book content.

💅 User Interface

Built with Tailwind CSS for modern, responsive styling.

Clean layout, accessible components, and consistent color scheme.

Styled buttons, cards, and modals for a professional look.
