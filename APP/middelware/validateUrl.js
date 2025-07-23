
const validateUrl =(req,res,next)=>{

const { originalUrl }= req.body;
try {
    if(!originalUrl){
return res.status(400).json({message :"Url is required"})
}

const urlPattern = new RegExp(
  "^(https?:\\/\\/)" +                            // 1
  "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,})" +  // 2
  "(\\:\\d+)?" +                                  // 3
  "(\\/[-a-zA-Z\\d%_.~+]*)*" +                    // 4
  "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" +                 // 5
  "(\\#[-a-zA-Z\\d_]*)?$",                        // 6
  "i"
);

if(!urlPattern.test(originalUrl)){
    return res.status(400).json({ error: "Invalid URL format" });
}
next();
    
} catch (error) {
      return res.status(500).json({ error: "Something went wrong in validation" });
    
}

}

export default validateUrl;