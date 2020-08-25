
After updating prisma.schema, do this to apply changes:

npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma generate


npx prisma studio --experimental



TO RUN DEV YOU NEED TO RUN TWO COMMANDS:
npm run watch
npm run dev
