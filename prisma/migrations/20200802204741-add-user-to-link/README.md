# Migration `20200802204741-add-user-to-link`

This migration has been generated at 8/2/2020, 8:47:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "User" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"name" TEXT NOT NULL,
"email" TEXT NOT NULL,
"password" TEXT NOT NULL)

ALTER TABLE "Link" ADD COLUMN "postedById" INTEGER ;

CREATE UNIQUE INDEX "Link.url" ON "Link"("url")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200802184731-test..20200802204741-add-user-to-link
--- datamodel.dml
+++ datamodel.dml
@@ -1,15 +1,27 @@
+
+
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
+model User {
+  id Int @id @default(autoincrement())
+  name String
+  email String
+  password String
+  links Link[]
+}
+
 model Link {
   id          Int      @id @default(autoincrement())
   createdAt   DateTime @default(now())
   description String
-  url         String
+  url         String @unique
+  postedBy    User? @relation(fields: [postedById], references: [id])
+  postedById  Int?
 }
```


