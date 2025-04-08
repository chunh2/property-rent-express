## Backend Only

## Prerequisites

- Node.js
- MySQL or similar

## Install Dependencies

```bash
npm install
```

## env

1. Create the file <code>.env</code> at the root directory with the following content.

```bash
PORT=

JWT_SECRET=

ALLOW_ORIGIN=
```

2. Set the value of the fields.

3. Generate JWT secret using following command, or any other approach. The value should not be shared publicly.

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Database

1. Run the following command.

```bash
npx sequelize-cli init
```

2. Configure database information in <code>config/config.json</code>.

## Seeder

```bash
npx sequelize-cli db:seed:all
```
