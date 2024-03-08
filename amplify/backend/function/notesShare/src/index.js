/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

exports.handler = async (event) => {
  try {
    const message = JSON.parse(event.Records[0].Sns.Message);

    const emailParams = {
      Destination: {
        ToAddresses: [message.email],
      },
      Message: {
        Body: {
          Text: {
            Data: `
                        Note Title: ${message.noteTitle}
                        Note Description: ${message.noteDescription}
                        Tag: ${message.tag}
                    `,
          },
        },
        Subject: { Data: 'Shared Note Content' },
      },
      Source: 'pmodi1081@gmail.com',
    };

    await ses.sendEmail(emailParams).promise();
    console.log('Email sent successfully');

    return { statusCode: 200, body: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { statusCode: 500, body: 'Error sending email' };
  }
};
