

must add `--experimental-modules` on any run server command so we can use import from instead of require
npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma studio --experimental
