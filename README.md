# fragments

Microservice Project for CCP555 (Cloud Computing for Programmers)

## Preparation

Make sure that your system is running Node version 16 or newer.

Next, run the following command to install all the necessary dependencies.

```bash
npm i
```

After this, you can begin running the following scripts as required.

## Running Scripts

### Start

```bash
npm start
```

Runs the node command to start the server in `src/server.js`.

### Lint

```bash
npm run lint
```

This script runs the the ESLint linter for the code to make sure there are no errors.

### Dev

```bash
npm run dev
```

This script starts the server using nodemon to hot reload after any changes made in the code.

### Debug

```bash
npm run debug
```

This script starts the server using nodemon to hot reload after any changes made in the code similar to dev but also starts the node inspector on port 9229 so that the debugger can be used.

## Other Commands

### Header Checking

```bash
curl -i localhost:8080
```

Run this command when the server is running to check if the server is sending all the right HTTP headers.
