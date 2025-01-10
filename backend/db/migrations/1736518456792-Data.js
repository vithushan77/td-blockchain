module.exports = class Data1736518456792 {
    name = 'Data1736518456792'

    async up(db) {
        await db.query(`CREATE TABLE "balance" ("id" character varying NOT NULL, "token_id" text NOT NULL, "balance" numeric NOT NULL, CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_0b0aa2866ff7aea6950efbd20c" ON "balance" ("token_id") `)
        await db.query(`CREATE TABLE "metrics" ("id" character varying NOT NULL, "total_transfers" integer NOT NULL, "unique_holders" integer NOT NULL, CONSTRAINT "PK_5283cad666a83376e28a715bf0e" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "balance"`)
        await db.query(`DROP INDEX "public"."IDX_0b0aa2866ff7aea6950efbd20c"`)
        await db.query(`DROP TABLE "metrics"`)
    }
}
