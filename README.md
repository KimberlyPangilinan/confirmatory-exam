# Fast Food - Confirmatory Exam

## Introduction

This documentation will guide you through installing and setting up the full stack CRUD application.

# Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Folder Structure](#folder-structure)
5. [Endpoints](#endpoints)

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js**
- **npm**

## Installation

Follow the steps below to install the application:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KimberlyPangilinan/confirmatory-exam.git
   ```
2. **Navigate to the project directory:**:

   ```bash
   npm install
   ```

3. Run `npm run dev`

## Folder Structure

Below is the standard folder structure of the project:

```
confirmatory-exam/
├── composables/         # Reusable composables for state and logic
├── store/               # Centralized state management
├── components/          # Vue components for UI
├── pages/               # Pages corresponding to routes
├── utils/               # Utility functions
├── plugins/             # Plugins for extending Nuxt functionality
├── types/               # Type definitions for TypeScript
├── server/              # Mock APIs folder
├── nuxt.config.js       # Nuxt configuration file
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
└── README.md            # Documentation
```

## Mock API Endpoints

Below is the list of available endpoints for the application, which includes mock endpoints.

### 1. **POST /api/checkout/validate**

- **Description:** Validates Cart

### 2. **POST /api/checkout/payment**

- **Description:** Validates Order Form

### 3. **POST /api/orders**

- **Description:** Submits a new order.

### 4. **GET /api/orders**

- **Description:** Gets all orders.
