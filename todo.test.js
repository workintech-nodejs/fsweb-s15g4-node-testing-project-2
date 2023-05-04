const db = require("./data/db-config");
const server = require("./api/server");
const superTest = require("supertest");

beforeAll(async ()=>{
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
});

afterAll(async ()=>{
    await db.destroy();
});

describe("Todo App Server Test",()=>{
    it("[1] Gorevler listeleniyor mu?", async()=>{
        const res = await superTest(server).get("/api/gorev");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });
    it("[2] Id'li Gorev listeleniyor mu?", async()=>{
        const res = await superTest(server).get("/api/gorev/1");
        expect(res.status).toBe(200);
        expect(res.body.GorevId).toBe(1);
    });
    it("[3] Gorev eklenebiliyor mu?", async()=>{
        const sample = {Adi:"Kitap Oku",Aciklama:"Test test"};
        const res = await superTest(server).post("/api/gorev").send(sample);
        expect(res.status).toBe(201);
        expect(res.body.Adi).toBe("Kitap Oku");
    });
    it("[4] Gorev silinebiliyor mu?", async()=>{
       
        await superTest(server).delete("/api/gorev/2");
        const res = await superTest(server).get("/api/gorev/2");
        expect(res.status).toBe(404);
    });

    it("[5] Tasklar listeleniyor mu?", async()=>{
        const res = await superTest(server).get("/api/task");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });
    it("[6] Id'li Task listeleniyor mu?", async()=>{
        const res = await superTest(server).get("/api/task/1");
        expect(res.status).toBe(200);
        expect(res.body.TaskId).toBe(1);
    });
    it("[7] Task eklenebiliyor mu?", async()=>{
        const sample = {Adi:"Kitap Oku",Aciklama:"Test test",GorevId:1};
        const res = await superTest(server).post("/api/task").send(sample);
        expect(res.status).toBe(201);
        expect(res.body.Adi).toBe("Kitap Oku");
    });
    it("[8] Task silinebiliyor mu?", async()=>{
       
        await superTest(server).delete("/api/task/2");
        const res = await superTest(server).get("/api/task/2");
        expect(res.status).toBe(404);
    });
});