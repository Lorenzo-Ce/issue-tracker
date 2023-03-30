# Issue Tracker

## About the project

The app is an issue tracker, users can create projects, track progress of different teams. 
Additionally, this app allows users to create, delete, and update issues/tickets, and assign them to different team members.

## Usage

You can create an account and log in to start creating projects or log in as a Guest user to take a peek. 
As Guest Account, you can't add, delete, or edit Projects or Issues.
Please note that considering the free instance of hosting site it might take some time to log in.
You can find it at https://issue-tracker-client.onrender.com. 

## Technologies

- React
- Chakra UI
- Node.js
- Express
- MongoDB
- Authorization/ Authentication with JSON Web Tokens
- Render for deployment

## Getting Started

### Prerequisites

To get started, you will need to install Node.js and npm on your computer. 
Here's how to do it on macOS and Windows:

> #### macOS
>
>1. Install Homebrew by running the following command in your terminal:
>```
>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
>```
>
>2. Install Node.js by running the following command in your terminal:
>```
>brew install node
>```

> #### Windows
>
> 1. Download and install the latest version of Node.js from the official website: https://nodejs.org/en/download/

#### MongoDB Atlas
You will also need a cloud database like MongoDB Atlas. 
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Create a new project and set up a new cluster.
3. Create a new database user with read/write access.

### Installation

1. Clone this repository by running the following command in your terminal:
    ```sh
    git clone https://github.com/Lorenzo-Ce/issue-tracker.git
    ```

2. After cloning, create an .env file in the project's root directory with the following variables:
    ```sh
    NODE_ENV=(production or development)
    DB_URI=uri of your mongodb database
    SECRET_ACCESS_TOKEN=secret key for access token
    SECRET_REFRESH_TOKEN=secret key for refresh token
    ```

* Example: 
    ```sh
    NODE_ENV=development
    DB_URI=mongodb+srv://<username>:<password>@cluster0-saugt.mongodb.net/test?retryWrites=true&w=majority
    SECRET_ACCESS_TOKEN=fa3367a734e729bdfa4b8c442e16e7bcab9b80e076cbc9acbee676f369689f4e
    SECRET_REFRESH_TOKEN=f67927d4b29587914ce7c6e530873c787de5e4cb2d2a4f65e7cf16b710f62c7c
    ```

3.Inside the repository install the necessary for server and client packages by running the following command in your terminal:
  ```sh
  npm install
  ```
* 3.1 After installing the necessary packages, you can run the app in development mode with:
  ```sh
  npm run dev
  ```
* 3.2 To build the app, run the following command:
  ```sh
  npm run build
  ```
* 3.3 To see a preview of the build, run the following command:
  ```sh
  npm run startPreview
  ```

## Contributing

If you find a bug or have an idea for a new feature, please open an issue on the GitHub repository.
If you would like to contribute code to the project, you are more than welcome, please follow these steps:

1. Fork the repository on GitHub. `git fork https://github.com/Lorenzo-Ce/issue-tracker.git`
2. Clone your forked repository to your local machine. `git clone https://github.com/<your-username>/issue-tracker.git`
3. Make your changes and commit them with a clear message. `git commit -m "your commit message"`
4. Push your changes to your forked repository on GitHub. `git push origin <your-branch-name>`
5. Open a pull request on the original repository with a clear description of your changes.

Thank you for contributing to the project!