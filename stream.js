const fs = require('fs');

const readStream = fs.createReadStream('./docs/large.txt');
const writeStream = fs.createWriteStream('./docs/large-write.txt');

//pipe
// readStream.on('data',function(data) {
//     writeStream.write(data.toString())
//     writeStream.write('---chunk---')
// })

readStream.pipe(writeStream);