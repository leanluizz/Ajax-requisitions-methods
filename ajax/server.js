const BODYPARSER = require("body-parser");
const express = require("express")
const APP = express()

APP.use(express.static("."))
APP.use(BODYPARSER.urlencoded({extended:true}))
APP.use(BODYPARSER.json())

const multer = require("multer")

const storage = multer.diskStorage({
    destination:function (req, file, callback){
        callback(null, "./upload")
    },
    filename:function (req, file, callback){
        callback(null, `${Date.now()}_${file.originalname.name}`)
    }
})

const upload = multer({storage}).single("arquivo")

APP.post("/upload", (req, res) =>{
    upload(req, res, err => {
        if(err){
            return res.end("Erro")
        }
        res.end("Concluido com sucesso")
    })
})


APP.post("/formulario", (req, res) =>{
    res.send({
        ...req.body,
        id: 7
    })
})

APP.get("/parOuImpar", (req, res) =>{
     const par = parseInt(req.query.numero) % 2 === 0
     res.send({
        resultado: par ? "par" : "impar"
     })
})

//APP.get("/teste", (req, res) => res.send("Ok"))
APP.listen(8080, () => console.log("Loading..."))