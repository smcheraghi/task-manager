const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000           //=1Mb
    },
    fileFilter(req, file, cb) {
        // if (!file.originalname.endsWith('.pdf')) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {                                      // look at regular expressions -> regex101.com -> \.(doc|docx)$
            return cb(new Error('Please upload a word document'))
        }
        
        cb(undefined, true)
        // cb(new Error('File must be PDF'))
        // cd(undefined, true)
        // cd(undefined, false)
    }
})
app.post('/upload', upload.single('upload'), (req, res)=>{
    res.send()
})