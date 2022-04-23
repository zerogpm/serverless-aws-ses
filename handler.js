"use strict";
const AWS = require("aws-sdk")
const ses = new AWS.SES()

module.exports.createContact = async (event, context) => {

  const {to, from, subject, message} = JSON.parse(event.body)

  if (!to || !from || !subject || !message) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(
        {
          message: "input values missing",
          input: JSON.parse(event.body),
        },
        null,
        2
      )
    }
  }

  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Html: {
          Data: `<strong>Message</strong>: ${message}`,
          Charset: 'UTF-8'
        }
      },
      Subject: {
        Data: subject
      }
    },
    Source: from
  }

  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(
        {
          message: "email sent!",
          success: true,
        }
      )
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "The email failed to send",
          input: event,
        }
      )
    }
  }
};
