
const asyncHandler =(fu)=>{
    return (req, res, next)=>{
        fu(req, res, next).catch((error)=> next(error))
    }
}

export {asyncHandler};