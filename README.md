# Property Rent (Backend Only)

- This project was developed using Express.js.
- This project should be run with the frontend <code>property-rent-next</code>, developed using Next.js.

## Software Requirements

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

4. <code>ALLOW_ORIGIN</code> should be the URL of the frontend.

## Folder

1. In root directory, create folder for static file.

```bash
mkdir -p uploads/property-images
```

## Database

1. Run the following command.

```bash
npx sequelize-cli init
```

2. Configure database information in <code>config/config.json</code>.

3. Recommended to create the database first.

4. Run migration.

```bash
npx sequelize-cli db:migrate
```

## Seeder

```bash
npx sequelize-cli db:seed:all
```

## For Development

1. Run the development server with nodemon.

```bash
npm run dev
```

2. Run the development server without nodemon. (Optional)

```bash
npm run start
```
