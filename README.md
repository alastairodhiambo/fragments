# fragments

Microservice Project for Cloud Computing for Programmers class

## Preparation

<hr>

Make sure that your system is running Node version 16 or newer.

Next, run the following command to do a clean install of all the necessary dependencies.

```bash
npm ci
```

After this, you can begin running the following scripts as required.

## Running Scripts

<hr>

### Start

```bash
npm start
```

Runs the node command to start the server in `src/server.js`.

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

### Test

```bash
npm test
```

Runs all unit tests

### Unit Test Coverage

```bash
npm run coverage
```

Runs all the unit tests and displays the unit test coverage within the respective files.

### Lint

```bash
npm run lint
```

This script runs the the ESLint linter for the code to make sure there are no errors.

## Other Commands

<hr>

### Header Checking

```bash
curl -i localhost:8080
```

Run this command when the server is running to check if the server is sending all the right HTTP headers.

### Integration Tests

```bash
./scripts/integration-tests.sh
```

Run all integration tests
