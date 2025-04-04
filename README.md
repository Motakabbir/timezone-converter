# Timezone Converter

A comprehensive timezone conversion and travel planning application built with Next.js. This application helps users manage international meetings, track world times, and plan travel across different timezones.

## Features

- **Timezone Converter**: Convert times between different timezones easily
- **World Clock**: View current time across multiple cities worldwide
- **Meeting Planner**: Schedule international meetings considering participants' local times
- **Travel Information**: Access weather data and cultural landmarks for destinations
- **Distance Calculator**: Calculate travel distances between locations

## Live Demo

Visit [Timezone Converter](https://timezone-converter.vercel.app) to try out the application.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/timezone-converter.git
cd timezone-converter
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- [Next.js](https://nextjs.org) - React framework for production
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Luxon](https://moment.github.io/luxon/) - DateTime manipulation library
- [FontAwesome](https://fontawesome.com) - Icons and visual elements

## Project Structure

- `/app` - Main application code
  - `/components` - Reusable React components
  - `/utils` - Utility functions for timezone, weather, and distance calculations
- `/public` - Static assets and images

## Deployment

The application is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy your application

## License

This project is licensed under the MIT License - see the LICENSE file for details.
