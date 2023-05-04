const db = require("../../data/db-config");

async function getAll(){
    return await db("Gorevler");
}
async function getById(id){
    return await db("Gorevler").where("GorevId",id).first();
}
async function create(obj){
    const [GorevId] = await db("Gorevler").insert(obj);
    return await getById(GorevId);
}
async function remove(id){
    await db("Gorevler").where("GorevId",id).del();
}

module.exports = {
    getAll,
    getById,
    create,
    remove
}