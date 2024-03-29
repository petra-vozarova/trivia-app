# Trivia Quiz App

The Trivia Quiz App is an interactive web application written in **TypeScript** using **React** and **Material-UI**. It provides users with a fun and engaging way to test their knowledge across various topics.

## Features
**Quiz Setup:** Before starting the quiz, users can configure their quiz settings to suit their preferences, or they can use default settings.

**Interactive Quiz:** Once the quiz is set up, users are presented with a series of questions, each with either multiple-choice or true / false answers.

**Context-based State Management:** The application uses *React Context* for state management, ensuring efficient data flow and state updates across components.

**Utility Functions:** The application includes utility functions such as `decodeData` for decoding data fetched from an *external API*.

**Responsive Design:** The application uses *Material-UI* components for a modern and responsive user interface.

## Components
**App:** The root component of the application. It renders the main layout and conditionally displays the Quiz or QuizSetUp component based on the state of quizData.

**Quiz:** This component handles the quiz logic, including displaying questions, collecting user responses, and calculating scores.

**QuizSetUp:** This component allows users to set up their quiz preferences before starting the quiz.

## Context

**QuizDataContext:** This context provides and manages the state of the quiz data across the application.

## Instructions

#### To run this app, navigate to the relevant folder and run `npm start` command

##


This application offers a great way to learn and have fun at the same time. Enjoy the Trivia Quiz App!