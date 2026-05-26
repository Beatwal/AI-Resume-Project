import multer from "multer"
const storage = multer.memoryStorage()
const uploadResume = multer({ 
    storage: storage ,
    limits:{fileSize:3*1024*1024}})
export {uploadResume}