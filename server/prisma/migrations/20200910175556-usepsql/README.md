# Migration `20200910175556-usepsql`

This migration has been generated at 9/10/2020, 5:55:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Excuse" (
"id" SERIAL,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"description" text  NOT NULL ,
"imageUrl" text  NOT NULL ,
"ownedById" integer   ,
PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "Excuse.imageUrl" ON "public"."Excuse"("imageUrl")

ALTER TABLE "public"."Excuse" ADD FOREIGN KEY ("ownedById")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200910173832-usepsql..20200910175556-usepsql
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -24,8 +24,17 @@
   postedBy    User? @relation(fields: [postedById], references: [id])
   postedById  Int?
 }
+model Excuse {
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+  description String
+  imageUrl         String @unique
+  ownedBy    User? @relation(fields: [ownedById], references: [id])
+  ownedById  Int?
+}
+
 // SQLite doesnt support enums, need to switch to real DB
 // enum Role {
 //   USER
 //   ADMIN
```


