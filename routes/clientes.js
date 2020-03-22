const { check, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  model.clientes.findAll({})
    .then(clientes=> res.json({
      error:false,
      data:clientes
    }))
    .catch(error=>res.json({
      error:true,
      data:[],
      error:error
    }));
});

router.post('/',function(req,res,next){
  const{nome,cpf}=req.body;

  model.clientes.create({
    nome:nome,
    cpf:cpf
  }).then(clientes=>res.status(201).json({
    error:false,
    data:clientes,
    message:'Cliente adicionado com sucesso'
  })).catch(error=>res.json({
    error:true,
    data:[],
    error:error
  }))
})

router.put('/:id',async function(req,res,next){
  await check('id').isInt().run(req);
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({
      error:true,
      data:[],
      error:errors.array()
    })
  }
  
  const{nome,cpf}=req.body;
  const cli_id = req.params.id;
  
  model.clientes.update({
    nome:nome,
    cpf:cpf
  },{
    where:{
      id: cli_id
    }
  }).then(clientes=>res.status(200).json({
    error:false,
    data:clientes,
    message:'Cliente atualizado com sucesso'
  })).catch(error=>res.json({
    error:true,
    data:[],
    error:error
  }))
})

router.delete('/:id', function(req,res,next){
  model.clientes.destroy({
    where:{
      id: req.params.id
    }
  }).then(clientes=>res.status(200).json({
    error:false,
    message:'Cliente removido com sucesso'
  })).catch(error=>res.json({
    error:true,
    data:[],
    error:error
  }))
})

module.exports = router;
