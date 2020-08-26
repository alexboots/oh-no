
After updating prisma.schema, do this to apply changes:

npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma generate


npx prisma studio --experimental



TO RUN DEV YOU NEED TO RUN TWO COMMANDS:
npm run watch
npm run dev


maybe use nexus at some point
https://dev.to/prisma/complete-introduction-to-fullstack-type-safe-graphql-feat-next-js-nexus-prisma-c5
https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3