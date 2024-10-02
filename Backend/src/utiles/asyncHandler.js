
const asyncHandler =(fn)=async(res,req,next)=>{
    try {
        await fn(res,req,next)
        
    } catch (error) {
        req.status(error.code||500).json({
            success:false,
            message:error.message
        })
    }

}
export {asyncHandler}