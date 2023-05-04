const router = require("express").Router();
const taskModel = require("./task-model");
const mw = require("./task-middleware");

router.get("/",async (req,res,next)=>{
    try {
        const all = await taskModel.getAll();
        res.json(all);
    } catch (error) {
        next(error);
    }
});

router.get("/:id",mw.checkTaskId,async(req,res,next)=>{
    try {
        res.json(req.Task);
    } catch (error) {
        next(error);
    }
});

router.post("/",async (req,res,next)=>{
    try {
        let {Adi,GorevId} = req.body;
        if(!Adi || !GorevId){
            res.status(400).json({message:"alanları kontrol ediniz."});
        }else{
            const inserted = await taskModel.create({Adi:req.body.Adi,Aciklama:req.body.Aciklama,GorevId:req.body.GorevId,Tarih:new Date()});
            res.status(201).json(inserted)
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/:id",mw.checkTaskId,async(req,res,next)=>{
    try {
        await taskModel.remove(req.params.id);
        res.json({message:"Silme işlemi başarılı"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;