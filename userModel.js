var AWS = require('aws-sdk');
var shortid = require('shortid')
AWS.config.update({region: 'us-west-2'});
var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const create = (usersData) => {  
  usersData.id = shortid()
  const params = {    
    TableName: 'users',    
    Item: usersData 
  }  
  return ddb.put(params).promise()
}

module.exports.create = create