
After updating prisma.schema, do this to apply changes:

npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma generate


npx prisma studio --experimental
