# Migration `20200910175909-add-user-role`

This migration has been generated at 9/10/2020, 5:59:09 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

ALTER TABLE "public"."User" ADD COLUMN "role" "Role" NOT NULL DEFAULT E'USER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200910175556-usepsql..20200910175909-add-user-role
--- datamodel.dml
+++ datamodel.dml
@@ -1,9 +1,11 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
+// MOVE TO ENV
+
 generator client {
   provider = "prisma-client-js"
 }
@@ -12,9 +14,9 @@
   name String?
   email String @unique
   password String
   links Link[]
-  // role Role @default(USER)
+  role Role @default(USER)
 }
 model Link {
   id          Int      @id @default(autoincrement())
@@ -33,9 +35,8 @@
   ownedBy    User? @relation(fields: [ownedById], references: [id])
   ownedById  Int?
 }
-// SQLite doesnt support enums, need to switch to real DB
-// enum Role {
-//   USER
-//   ADMIN
-// }
+enum Role {
+  USER
+  ADMIN
+}
```


