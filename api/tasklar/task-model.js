const db = require("../../data/db-config");
async function getAll(){
    return await db("Tasklar");
}
async function getById(id){
    return await db("Tasklar").where("TaskId",id).first();
}
async function create(obj){
    const [TaskId] = await db("Tasklar").insert(obj);
    return await getById(TaskId);
}
async function remove(id){
    await db("Tasklar").where("TaskId",id).del();
}

module.exports = {
    getAll,
    getById,
    create,
    remove
}