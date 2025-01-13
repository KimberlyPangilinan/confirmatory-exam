# Fast Food - Confirmatory Exam

## Introduction

This documentation will guide you through installing and setting up the full stack CRUD application.

# Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Folder Structure](#folder-structure)
5. [API Endpoints](#api-endpoints)
6. [Testing Instructions](#testing-instructions)
7. [Credentials](#credentials)
8. [Known Limitations](#known-limitations)

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
├── error.vue            # Customized error page
└── README.md            # Documentation
```

## API Endpoints

- [Platzi FakeStore API](https://api.escuelajs.co/api/v1)

### 1. **POST /auth/login**

Body

```
   {
      "email": "john@mail.com",
      "password": "changeme"
   }
```

### 2. **GET /products**

## Testing Instructions

- [POSTMAN COLLECTION](https://www.postman.com/cynamoln-042623/workspace/mock-api/collection/40711221-3a8204ba-888e-47fc-bd8b-0ba4b8b678f1?action=share&creator=40711221&active-environment=40711221-61ee58b7-7926-4af3-8aef-1bc122c69333)

- Import the collection above using POSTMAN Application, make sure New Environment is being used

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

## Credentials

email: john@mail.com
password: changeme

## Known Limitations

1. Error Handling

- Validation errors may not provide detailed feedback for all input issues.

2. Form Validation

- Most validation, like validating card details specific requirements, are not fully implemented.

3. Performance Issues

- Optimizing images, are not fully implemented.
