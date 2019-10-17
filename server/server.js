/**
 * Calculator
 * @author: smartameer
 */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT || 8080
const host = process.env.HOST || 'localhost'
const Service = require('./app/service')

const router = express.Router()
router.route('/getData').get(Service.getData)
router.route('/saveData').post(Service.saveData)
router.route('/clearData').delete(Service.clearData)


const init = () => {
    const calculator = express()
    calculator.use( bodyParser.json() )
    calculator.use(cors())
    calculator.use('/api', router)

    var server = calculator.listen(port, host, () => {
        const host = server.address().address
        const port = server.address().port
        console.log("Application listening at http://%s:%s", host, port)
    })
    return server
}
process.on('uncaughtException', err => {
    console.log('Caught exception: ' + err)
})

module.exports = init
