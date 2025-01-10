module.exports = class Data1736515933531 {
    name = 'Data1736515933531'

    async up(db) {
        await db.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "name" text NOT NULL, "symbol" text NOT NULL, "decimals" numeric NOT NULL, "total_supply" numeric NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_dc9680c2bbb75483a58b9c4fc5" ON "token" ("name") `)
        await db.query(`CREATE INDEX "IDX_e31c0ee2b8847dc76f3646ecc7" ON "token" ("symbol") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "token"`)
        await db.query(`DROP INDEX "public"."IDX_dc9680c2bbb75483a58b9c4fc5"`)
        await db.query(`DROP INDEX "public"."IDX_e31c0ee2b8847dc76f3646ecc7"`)
    }
}
