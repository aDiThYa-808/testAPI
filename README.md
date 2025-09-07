# testAPI

A CLI tool to create and manage mock API endpoints. It is designed mainly for frontend developers who want a simple way to test their application without setting up a backend server.

---

## Features (current stage)
- Initialize project with a `testapi.json` file.
- Start a local server in your desired port.
- Add new endpoints with `--method`,`--path`,`--response` and `--status`(status code is optional).
- The new endpoints are stored in `testapi.json` file. Duplicate entries are prevented.

---

## Installation
```bash
git clone https://github.com/aDiThYa-808/testAPI.git
cd testAPI
npm install
npm run build # this will create `dist/`
```

---

## Usage
### Initialize project:
```bash
node dist/cli/index.js init
```
### Start server
```bash
node dist/cli/index.js start ---port 3000
```
### Add endpoint
```bash
node dist/cli/index.js add --method GET --path /users --response '[{"id":123,"name":"virat"},{"id":456,"name":"kohli"}]' --status 200
```

---

## Next steps
- Serve endpoints via a custom HTTP server.
- Add `list` and `remove` commands.

---

## Contributing
### Contribution are welcome. Please follow these guidelines.
- **License**: This project is licensed under the Apache License 2.0.
- **Commit messages**: Use clear, conventional commit names (feat:, fix:, chore:, refactor: and docs:).
- **Pull requests**: All PRs must target the `dev` branch not main.
- **Code style**: All source code must be written inside `src/` directory. Code must be written in TypeScript only.

---

# THANK YOU