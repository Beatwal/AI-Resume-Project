
import { app } from "./src/app.js"
import { connectingToDb } from "./src/config/database.js"
const port=process.env.PORT || 4000



connectingToDb()
.then(()=>{

    app.listen(3000,()=>{
        console.log(`your app is listening on port ${port}`)
        
    })
})
.catch((err)=>{
    console.log("Something went wrong",err)
})