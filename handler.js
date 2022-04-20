"use strict";
const AWS = require("aws-sdk")
const ses = new AWS.SES()

module.exports.createContact = async (event, context) => {
  console.log("Event::", event);
  const {to, from, subject, message} = JSON.parse(event.body)

  if (!to || !from || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "input values missing",
          input: event,
        },
        null,
        2
      ),
    }
  }

  const params = {

  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
