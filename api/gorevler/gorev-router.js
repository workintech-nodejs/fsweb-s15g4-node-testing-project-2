const router = require("express").Router();
const gorevModel = require("./gorev-model");
const mw = require("./gorev-middleware");

router.get("/",async (req,res,next)=>{
    try {
        const all = await gorevModel.getAll();
        res.json(all);
    } catch (error) {
        next(error);
    }
});

router.get("/:id",mw.checkGorevId,async(req,res,next)=>{
    try {
        res.json(req.Gorev);
    } catch (error) {
        next(error);
    }
});

router.post("/",async (req,res,next)=>{
    try {
        let {Adi} = req.body;
        if(!Adi){
            res.status(400).json({message:"Gorev Adı Boş olamaz"});
        }else{
            const inserted = await gorevModel.create({Adi:req.body.Adi,Aciklama:req.body.Aciklama});
            res.status(201).json(inserted)
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/:id",mw.checkGorevId,async(req,res,next)=>{
    try {
        await gorevModel.remove(req.params.id);
        res.json({message:"Silme işlemi başarılı"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;