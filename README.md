# testapi-cli

A CLI tool to create and manage mock API endpoints. It is designed mainly for frontend developers who want a simple way to test their application without setting up a backend server.

---

## Features (current stage)
- Initialize project with a `testapi.json` file.
- Add new endpoints with `--method`,`--path`,`--response` and `--status`(status code is optional).
- The new endpoints are stored in `testapi.json` file. Duplicate entries are prevented.
- Start a local server in your desired port.
- Call the added endpoints and get its response.

---

## Installation
```bash
npm i testapi-cli
```

---

## Usage (current stage)

### Guide
```bash
testapi-cli help
```
### Initialize project:
```bash
testapi-cli init #creates testapi.json file
```
### Add endpoint
```bash
testapi-cli add --method GET --path /users --response '[{"id":123,"name":"virat"},{"id":456,"name":"kohli"}]' --status 200
```
- #### Rules:
- --method must be a valid HTTP method.
- --path must begin with '/'.
- --response must be valid JSON enclosed within single quotes.
- --status is optional (default: 200)
### Start server
```bash
testapi-cli start --port 3000
```
- #### Rules:
- --port must be in the range 1024-65535
### Call endpoint
```bash
GET http://localhost:3000/users
```
### Expected response
```json
[
  {"id":123,"name":"virat"},
  {"id":456,"name":"kohli"}
]
```

---

## Next steps
- Implement delay option for responses.
- Add `list` and `remove` commands.

---

## Contributing
### Contributions are welcome. Please check CONTRIBUTING.md for the guidelines.
---

# THANK YOU