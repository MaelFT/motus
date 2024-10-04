# Motus

## Description

"Motus" is a word-guessing game where players must find a hidden word within a limited number of attempts, inspired by games like Wordle. Each word is a randomly selected vegetable, and players must complete the missing letters before running out of tries. The game also features a virtual keyboard that allows players to input their guesses by clicking on the letters.

## Features

- Guess the hidden word by filling in the missing letters.
- Each attempt displays **red** for correctly placed letters and **yellow** for letters that are in the word but in the wrong position.
- A virtual keyboard lets players click letters to make guesses.
- The game handles win, loss, and invalid guess states (e.g., if letters are missing).
- A counter shows how many attempts are remaining.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (Version 12.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Install

1. Clone the repository and install the dependencies:

```bash
git clone https://github.com/MaelFT/motus

cd motus

npm install

npm run dev
```

### Technologies

- **React**: Frontend framework used for building the user interface.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **TypeScript**: Type-safe JavaScript used in the project.
- **Vite**: Fast development build tool.