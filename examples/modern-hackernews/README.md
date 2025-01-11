# Modern HackerNews

A modern, real-time HackerNews client built with React and Skrape.ai. Features a clean UI, real-time updates, and persistent storage.

## Features

- 🚀 Real-time HackerNews stories
- 💾 Persistent storage
- 🎨 Modern UI with Tailwind CSS
- 🔄 Automatic refresh every 5 minutes
- 📱 Responsive design

## Prerequisites

- [Bun](https://bun.sh) installed on your system
- [Skrape.ai](https://skrape.ai) API key

## Setup

1. Clone the repository
2. Install the dependencies:

```bash
bun install
```

1. Create a `.env` file in the root directory with your Skrape.ai API key:

```bash
PUBLIC_SKRAPE_API_KEY=your_api_key_here
```

## Development

Start the dev server:

```bash
bun dev
```

Format code:

```bash
bun format
```

Lint code:

```bash
bun lint
```

## Production

Build the app:

```bash
bun build
```

Preview the production build:

```bash
bun preview
```

## Tech Stack

- React 19
- TanStack Query
- Tailwind CSS
- TypeScript
- Rsbuild
- Biome
