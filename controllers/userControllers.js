const {
    createUserService,
    getUserByIdService,
    getAllUsersService,
    updateUserService,
    deleteUserService,
} = require('./services/userServices');

createUserController =  async (req, res) => {

    try{
       const newUser= await createUserService(req.body);
       res.status(200).json(newUser);

    }catch(err){
        res.status(500).send({error: err.message});
    }
}

updateUserController =  async (req, res) => {
    try{
        const {userId}=req.params;
        const data=req.body;
        const newUser= await updateUserService(userId,data);
        res.status(200).json(newUser);
    }catch(err){ res.status(500).send({error: err.message});}
}

deleteUserController =  async (req, res) => {
    try{
        const {userId} = req.params;
        await deleteUserService(userId);
        res.status(200).json({message: 'Deleted user'});
    }catch(err){
        res.status(500).send({error: err.message});
    }
}

getAllUsersController =  async (req, res) => {
   try{
       const allUsers= await getAllUsersService();
       res.status(200).json(allUsers);

   }catch(err){res.status(500).send({error: err.message});}
}

getUserByIdController =  async (req, res) => {
    try{
        const {userId} = req.params;
        const user=getUserByIdService(userId);
    }
    catch(err){ res.status(500).send({error: err.message});}
}


module.exports = {
    createUserController,
    getUserByIdController,
    deleteUserController,
    getAllUsersController,
    updateUserController,
}