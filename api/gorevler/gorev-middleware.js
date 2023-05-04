const gorevModel = require("./gorev-model");

async function checkGorevId(req,res,next){
    try {
        const isExist = await gorevModel.getById(req.params.id);
        if(!isExist){
            res.status(404).json({message:"not found"});
        }else{
            req.Gorev = isExist;
            next();
        }
    } catch (error) {
        next(error);
    }
}
module.exports = {checkGorevId};