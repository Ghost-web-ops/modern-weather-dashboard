# Modern Weather App UI

A clean, responsive, and modern weather application interface built to display live weather data. This project was created to practice and showcase skills in modern frontend development using a popular and efficient tech stack.

[**Live Demo**](https://your-deployment-link.vercel.app) ⬅️ *(You can add your Vercel deployment link here later)*

## ✨ Features

-   **Live Data**: Fetches and displays current weather data from the OpenWeatherMap API.
-   **Responsive Design**: A beautiful and functional UI on all devices, from mobile to desktop.
-   **Modern Tech Stack**: Built with the latest tools including React, Vite, TypeScript, and Tailwind CSS.
-   **Dynamic Icons**: Displays different icons based on the current weather condition.
-   **Loading & Error States**: Provides a clear user experience while fetching data or if an error occurs.

## 🚀 Tech Stack

-   **Framework**: [React](https://react.dev/) (with [Vite](https://vitejs.dev/))
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Data**: [OpenWeatherMap API](https://openweathermap.org/api)

## 🔧 Local Setup and Installation

### Prerequisites

-   Node.js (v18.x or later)
-   An API Key from [OpenWeatherMap](https://openweathermap.org/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/[YOUR_REPO_NAME].git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd [YOUR_REPO_NAME]
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Set up environment variables:**
    -   Create a file named `.env.local` in the root of the project.
    -   Add your OpenWeatherMap API key to it:
        ```env
        VITE_OPENWEATHER_API_KEY=your_api_key_here
        ```
5.  **Run the development server:**
    ```bash
    npm run dev
    ```

The app will be available at `http://localhost:5173`.

## 🖼️ Preview

![Weather App Screenshot](./public/screenshot.png) 
*(You can place a screenshot of the app in the `public` folder and update this path)*