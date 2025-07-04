import express from 'express'
import {getAllAccount, getByIdAccounts, createAccount, updateaccount, deleteaccount} from '../models/accounts.js'

const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        const result = await getAllAccount()
        res.send(result)
    }catch(error){
        console.log('error fetching accounts')
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const id = parseInt(req.params.id)
        if (isNaN(id)) res.status(400).send("id not yet")

        const result = await getByIdAccounts(id)
        res.send(result)
    }catch(error){
        console.error("Error fetching accounts:", error);
    }
})

router.post('/', async (req, res)=>{
    try{
        const {customer_id, branch_id, type_id, account_number, balance, status, opened} = req.body

        const result = await createAccount(customer_id, branch_id, type_id, account_number, balance, status, opened)
        res.status(201).json({message: "account add"})

    }catch(error){
        console.error("Error fetching accounts:", error);
    }
})


router.put('/:id', async (req, res)=>{
    try{
        const {id, column, value} = req.body
        const result = await updateaccount(id, column, value)
        res.send(result)
    }catch(error){
        console.error("Error fetching accounts:", error);
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const result = await deleteaccount(id)

        res.status(201).json({message: "account delete"})
    }catch(error){
        console.error("Error fetching accounts:", error);
    }

})

export default router;