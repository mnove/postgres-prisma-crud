# Overview

A nodejs app to test Postgres and Prisma ORM.

# Technologies used

### DB

- Postgres 13

### ORM

- Prisma

### Server

- Expressjs 4
- Morgan
- Winston

# Run the application

To run the application in "development"

```
npm run dev
```

The `NODE_ENV` is automatically set to `development` by script in `package.json`.

If the `NODE_ENV` environment is different than `development` or is not set, the production logger will be used.
