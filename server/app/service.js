/**
 * Calculator
 * @author: smartameer
 */

const connection = require('./db')

/**
 * getData
 * @desc Fetches recent entry of data from database
 * @params req Object Http Request Object
 * @params res Object Http Response Object
 * @params next function Http callback method
 * @return Object - status 200
 * @error null - status 400
 */
const getData = (req, res, next) => {
    console.log( req.method + ' : ' + req.url)
    res.type('json')
    connection.query('select * from calculator_data LIMIT 1', (error, results) => {
        if (error) {
            res.status(400)
            res.end(error)
        }
        if (results.length > 0) {
            var record = results[0]
            delete record.id
            res.json(record)
            res.end()
        } else {
            res.status(400)
            res.end(error)
        }
        next()
    })
}

/**
 * saveData
 * @desc Saves user entry to database
 * @params req Object Http Request Object
 * @params res Object Http Response Object
 * @params next function Http callback method
 * @return null - status 202
 * @error null - status 400
 */
const saveData = (req, res, next) => {
    console.log( req.method + ' : ' + req.url)
    res.type('json')
    const { input1, input2, result } = req.body
    const sql = `INSERT INTO calculator_data(input1, input2, result) VALUES (${input1}, ${input2}, ${result}) ON DUPLICATE KEY UPDATE input1 = ${input1}, input2 = ${input2}, result = ${result}`
    connection.query(sql, error => {
        if (error)  {
            res.status(400)
            return next(error)
        }
        res.status(202)
        res.end()
        next()
    })
}

/**
 * saveData
 * @desc Deletes user entry to database
 * @params req Object Http Request Object
 * @params res Object Http Response Object
 * @params next function Http callback method
 * @return null - status 204
 * @error null - status 400
 */
const clearData = (req, res, next) => {
    console.log( req.method + ' : ' + req.url)
    const sql = `DELETE FROM calculator_data WHERE id > 0`
    connection.query(sql, error => {
        if (error)  {
            res.status(400)
            return next(error)
        }
        res.status(204)
        res.end()
        next()
    })
}

module.exports = {
    getData,
    saveData,
    clearData
}
