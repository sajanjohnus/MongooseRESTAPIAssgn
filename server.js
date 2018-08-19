const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')


let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-course-db',{ useNewUrlParser: true } )

  const Account = mongoose.model('account', {
    name: String,
    balance: Number
  })


    app.get('/accounts', (req, res) => {
        Account.find({}, null, {sort: {_id: -1}}, (error, accounts) => {
            if (error) return next(error)
            res.send(accounts)
      })
    })
  

    app.post('/accounts', (req, res) => {
        let postData = new Account(req.body)
        postData.save((error, results) => {
          if (error) return next(error)
          res.send(results)
        })
    })


    app.put('/accounts/:id', (req, res) => {
        
          Account.findById(req.params.id, (error, account) => {
            if (error) return next(error)
            account.name = req.body.name
            account.balance = req.body.balance
            account.save((error, results) => {
              res.send(results)
            })
          })
          
       })

    app.delete('/accounts/:id', (req, res) => {
                
        Account.findById(req.params.id, (error, account) => {
            if (error) return next(error)
            account.remove((error, results) => {
              if (error) return next(error)
              res.send(results)
            })
          })        
       })
    
    app.listen(3000)
  






  