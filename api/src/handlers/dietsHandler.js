const {getDiets} = require ('../controllers/dietsRequest')

const allDiets = async(req,res)=>{
    try {
        const results = await getDiets()
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports ={allDiets}