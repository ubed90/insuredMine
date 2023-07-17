# InsuredMine Assignment App -  Angular

## Getting Started
To get started with this application, you need to clone this repository to your local machine.

```bash
  git clone https://github.com/ubed90/insuredMine.git
```

## Prerequisites
- Make sure NodeJS, NPM (Node Package Manager) / YARN are installed on your machine.
## Installing
1. Open your terminal and navigate to the root folder of the cloned repository
2. Run the following command to install the required dependencies for FrontEnd as well as Server:
```bash
  cd insuredMine/
  npm install
```

## Running the Application

### Backend
- Open your terminal and navigate to the root folder of the cloned repository to start the fake json server
    ```bash
        npm run start:db
    ```

### FrontEnd
- Open your terminal and navigate to the root folder of the cloned repository
- Enter the following command to start the Angular Dev server.
    ```bash
        npm start
    ```

- Open your browser and navigate to http://localhost:4200

## Notable Features
1. No Third Party Libraries used for FrontEnd only crafted using Raw CSS.
2. Fake Json Server is used for mocking database.
3. Login and Signup options are available and working
4. Created a custom Redux store to store Loggedin user and User as well.
5. Crafted using Angular Environment using Directive, Event Bindings, Two Way data binding.