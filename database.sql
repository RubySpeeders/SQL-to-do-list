CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" varchar (120) NOT NULL,
	"status" boolean
	);

  INSERT INTO "todo" ("task", "status") VALUES ('finish weekend assignment', 'false');