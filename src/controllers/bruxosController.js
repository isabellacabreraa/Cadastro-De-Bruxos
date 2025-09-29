import dados from "../models/dados.js";
const { bruxos } = dados;

const getAllbruxos = (req, res) => {
    let resultado = bruxos;

    
    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
}

const getBruxosById = (req, res) => {
    const id = parseInt(req.params.id);
    const bruxo = bruxos.find(m => m.id === id);

    if (!bruxo) {
        res.status(404).json({
            success: false,
            message: "Nenhum bruxo foi encontrado no Beco Diagonal!"

        })
    }

    res.status(200).json({
        total: bruxo.length,
        data: bruxo
    })
}

const createBruxo = (req, res) => {
    const { nome, casa, ano, varinha, mascote, patrono, especialidade } = req.body;


    if (!nome) {
        return res.status(400).json({
            success: false,
            message: "O campo 'nome' é obrigatório"
        });
    }

    if (!casa ) {
        return res.status(400).json({
            success: false,
            message: `O campo 'casa' é obrigatório `
        });
    }

    if (!ano) {
        return res.status(400).json({
            success: false,
            message: "O campo 'ano' é obrigatório"
        });
    }

    if (!varinha) {
        return res.status(400).json({
            success: false,
            message: "O campo 'varinha' é obrigatório"
        });
    }

    if (!mascote) {
        return res.status(400).json({
            success: false,
            message: "O campo 'mascote' é obrigatório"
        });
    }

    if (!patrono) {
        return res.status(400).json({
            success: false,
            message: "O campo 'patrono' é obrigatório"
        });
    }

    if (!especialidade) {
        return res.status(400).json({
            success: false,
            message: "O campo 'especialidade' é obrigatório"
        });
    }


    const novoBruxo = {
        id: bruxos.length + 1,
        nome: nome,
        casa,
        ano,
        varinha,
        mascote,
        patrono,
        especialidade
    }

        const bruxoExiste = bruxos.find(b => b.nome === novoBruxo.nome);
        if (bruxoExiste) {
            res.status(409).json({
                success: false,
                message: "Já existe um bruxo com esse nome!"
            })
        } else {
            bruxos.push(novoBruxo);
        
            res.status(201).json({
                success: true,
                message: "Novo bruxo matriculado em Hogwarts!",
                data: novoBruxo
            })   
        }
}


const updateBruxo = (req,res) => {
    const id = parseInt(req.params.id);
    
    const { nome, casa, ano, varinha, mascote, patrono, especialidade } = req.body;
    
    const idParaEditar = id;

    const bruxoEncontrado = bruxos.find(bruxo => bruxo.id === idParaEditar );

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido"
        })
    }

      if (!bruxoEncontrado) {
        return res.status(404).json({
          success: false,
          message: "Não é possível reparar o que não existe"
        })
      }
  
      const bruxosAtualizados = bruxos.map(bruxo => bruxo.id === idParaEditar ? {
          ...bruxo,
          ...(nome && {nome}),
          ...(casa && {casa}),
          ...(ano && {ano: parseInt(ano)}),
          ...(varinha && {varinha}),
          ...(mascote && {mascote}),
          ...(patrono && {patrono}),
          ...(especialidade && {especialidade})
      } : bruxo)
  
        bruxos.splice(0, bruxos.length, ...bruxosAtualizados);
  
        const bruxoNovo = bruxos.find(bruxo => bruxo.id === idParaEditar);
  
        res.status(200).json({
          success: true,
          message: `Dados do bruxo ID ${idParaEditar} atualizados com sucesso!`,
          bruxo: bruxoNovo
        })
  }

const deleteBruxo = (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const bruxoParaRemover = bruxos.find(b => b.id === idParaApagar);
    console.log(bruxoParaRemover)

    const bruxoFiltrado = bruxos.filter(b => b.id !== id);
    console.log(bruxoFiltrado)

    bruxos.splice(0, bruxos.length, ...bruxoFiltrado);

    return res.status(200).json({
        success: true,
        message: "O bruxo foi expulso de Hogwarts com sucesso!"
    })
}


export { getAllbruxos, getBruxosById, createBruxo, updateBruxo, deleteBruxo };