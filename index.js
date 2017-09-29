import { getCommandLine } from './command-line'
import { getBusiness } from './database'

var foo = getCommandLine()
console.log(foo)

// var bar = getBusiness()

// async var f = () => {
//   console.log(await bar)
// }

var exec = require('child_process').exec
exec('open chrome www.google.es' , function(err) {
if(err){ //process error
  console.log(err)
}
else{ console.log("success open")
}
})