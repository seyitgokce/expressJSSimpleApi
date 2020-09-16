var express = require("express");
var router = express.Router();

var Connection = require('tedious').Connection
var Request = require('tedious').Request

var config = {
  server: 'bigshopdb.database.windows.net',
  authentication: {
    type: 'default',
    options: {
      userName: 'username',
      password: 'password',
      database: 'database'
    }
  }
}

var connection = new Connection(config)

connection.on('connect', function (err) {
  if (err) {
    console.log(err)
  } else {
    executeStatement()
  }
})

function executeStatement () {
  request = new Request("SELECT * FROM Nehir390.INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';", function (err, rowCount) {
    if (err) {
      console.log(err)
    } else {
      console.log(rowCount + ' rows')
    }
    connection.close()
  })

  request.on('row', function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log('NULL')
      } else {
        console.log(column.value)
      }
    })
  })

  connection.execSql(request)
}




router.get("/", function(req, res) {
  res.send("GET ile /nehirs isteği yapıldı. " + executeStatement() );
});

router.post("/", function(req, res) {
  res.send("POST ile /nehirs isteği yapıldı.");
});

module.exports = router;
