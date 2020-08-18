# Migration `20200818183350-reset-db`

This migration has been generated at 8/18/2020, 6:33:50 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "User" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"name" TEXT ,
"email" TEXT NOT NULL,
"password" TEXT NOT NULL)

CREATE TABLE "Link" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"description" TEXT NOT NULL,
"url" TEXT NOT NULL,
"postedById" INTEGER ,
FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "User.email" ON "User"("email")

CREATE UNIQUE INDEX "Link.url" ON "Link"("url")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200818183350-reset-db
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,32 @@
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id Int @id @default(autoincrement())
+  name String?
+  email String @unique
+  password String
+  links Link[]
+  // role Role @default(USER)
+}
+
+model Link {
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+  description String
+  url         String @unique
+  postedBy    User? @relation(fields: [postedById], references: [id])
+  postedById  Int?
+}
+
+// SQLite doesnt support enums, need to switch to real DB
+// enum Role {
+//   USER
+//   ADMIN
+// }
```


