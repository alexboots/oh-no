# Migration `20200910184938-change-img-url-to-s3buckjetid`

This migration has been generated at 9/10/2020, 6:49:38 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."Excuse.imageUrl"

ALTER TABLE "public"."Excuse" DROP COLUMN "imageUrl",
ADD COLUMN "s3ImageId" text  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200910175909-add-user-role..20200910184938-change-img-url-to-s3buckjetid
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 // MOVE TO ENV
@@ -30,11 +30,11 @@
 model Excuse {
   id          Int      @id @default(autoincrement())
   createdAt   DateTime @default(now())
   description String
-  imageUrl         String @unique
-  ownedBy    User? @relation(fields: [ownedById], references: [id])
-  ownedById  Int?
+  s3ImageId   String
+  ownedBy     User? @relation(fields: [ownedById], references: [id])
+  ownedById   Int?
 }
 enum Role {
   USER
```


