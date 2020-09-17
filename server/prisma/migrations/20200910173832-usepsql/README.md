# Migration `20200910173832-usepsql`

This migration has been generated at 9/10/2020, 5:38:32 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"id" SERIAL,
"name" text   ,
"email" text  NOT NULL ,
"password" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Link" (
"id" SERIAL,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"description" text  NOT NULL ,
"url" text  NOT NULL ,
"postedById" integer   ,
PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "Link.url" ON "public"."Link"("url")

ALTER TABLE "public"."Link" ADD FOREIGN KEY ("postedById")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200818183350-reset-db..20200910173832-usepsql
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
-  provider = "sqlite"
-  url = "***"
+  provider = "postgresql"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
```


