export const catchAsyncErrors=(thefunc)=>{
    return (req,res,next)=>{
        Promise.resolve(thefunc(req,res,next)).catch(next)
    }

}