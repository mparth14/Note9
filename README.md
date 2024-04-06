# 📝 Note9 Web Application

## Overview

Note9 is a modern, serverless web application designed to streamline note-taking and collaboration. Built on top of AWS services, Note9 offers a robust platform for creating, updating, deleting, and sharing notes efficiently. With its intuitive user interface and seamless integration of various AWS services, Note9 aims to enhance productivity and simplify the note-taking process for users.

## Tech Stack

- **Frontend**:
  - React
  - MaterialUI
  - Quill (for rich text editing)
- **Backend**:
  - AWS Lambda
  - AWS S3
  - AWS DynamoDB
  - AWS Gateway
  - AWS AppSync
  - AWS Cognito
- **Deployment**:
  - AWS EC2
  - AWS ELB (Load Balancer)
- **Email Service**:
  - AWS SES (Simple Email Service)

## Features

### 🛡️ User Authentication and Management

- Utilizes AWS Cognito for secure user authentication and management.
- Users can sign up, sign in, and manage their accounts securely.

### 📝 Note Management

- Create, update, and delete notes effortlessly.
- Notes are stored in AWS DynamoDB, ensuring scalability and reliability.
- Rich text editing capabilities using Quill, enabling users to format their notes conveniently.

### 🖼️ Image Storage

- Users can upload and store images in AWS S3.
- Seamless integration allows users to include visuals in their notes easily.

### 📧 Note Sharing via Email

- Share notes via email with ease using AWS SES.
- Facilitates seamless collaboration among users.

### ⚙️ GraphQL API

- Leveraging AWS AppSync, Note9 provides GraphQL APIs for enhanced scalability and flexibility.
- Allows for efficient data fetching and manipulation.

### 📱 Responsive Design

- Developed using React and MaterialUI, Note9 offers a responsive and intuitive user interface across various devices.

## 🚀 Steps to run the project

1. Clone the repository:

  `git clone https://github.com/mparth14/Note9.git`

3. Navigate to the project directory:

  `cd Note9`

4. Install dependencies:

  `npm install`

5. Start the development server:

  `npm run dev`

6. Access the application at

  `http://localhost:3000`

## Future Enhancements

- Implement offline functionality using AWS AppSync and Amplify to enable users to access and modify notes even without an internet connection.
- Integrate real-time collaboration features using WebSocket APIs for enhanced teamwork and productivity.
- Enhance user experience with additional formatting options for notes, including support for code snippets, tables, and more.
- Implement user roles and permissions for advanced access control, allowing administrators to manage user privileges effectively.

## Contributors

- [Parth Modi](https://github.com/mparth14)

## License

This project is licensed under the [MIT License](LICENSE).
