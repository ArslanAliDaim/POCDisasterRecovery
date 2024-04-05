const {
  SNSClient,
  CreatePlatformEndpointCommand,
  PublishCommand,
  SubscribeCommand,
} = require("@aws-sdk/client-sns");
const { uuid } = require("uuidv4");

const CREDENTIALS = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  sessionToken: process.env.sessionToken,
};

const REGION = process.env.REGION;

const client = new SNSClient({ region: REGION, credentials: CREDENTIALS });

exports.handler = async (event, context, callback) => {
  try {
    // Parse the request body
    console.log(event);
    let response = {};
    switch (event.resource) {
      case "/":
        response = await pushNotification(event);
        break;
      case "/device-token":
        response = await registerDeviceWithAWS(JSON.parse(event.body));
        break;
      default:
        throw new Error(`Unsupported route: “${event.resource}”`);
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
    });
  } catch (error) {
    // Return an error response if something goes wrong
    console.log("Error::", error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};

async function pushNotification(event) {
  console.log("send notification");
  const parsedBody = JSON.parse(event.body);
  const { message, title = "", data = {} } = parsedBody;
  console.log("Message::: ", message, "title:: ", title, "Data::: ", data);
  // Construct FCM payload
  const fcmPayload = {
    notification: {
      title,
      body: message,
    },
    data, // Add your custom data here
  };

  const platformMessage = JSON.stringify({
    GCM: JSON.stringify(fcmPayload),
  });

  const params = {
    Message: platformMessage,
    TargetArn: process.env.SNS_TOPIC_ARN, // Replace with your SNS topic ARN,
  };

  try {
    const command = new PublishCommand(params);
    const response = await client.send(command);
    console.log("Response push message::: ", response);
    return {
      statusCode: 200,
      body: "Push notification sent successfully!",
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Error sending push notification!",
    };
  }
}

const registerDeviceWithAWS = async (body) => {
  const { deviceToken } = body;

  const endpointArn = await createSNSEndpoint(deviceToken);
  const subscribeToTopic = await subscribeDeviceToTopic(endpointArn);

  return {
    subscribeToTopic,
    endpointArn,
  };
};

async function createSNSEndpoint(deviceToken) {
  const params = {
    PlatformApplicationArn: process.env.SNS_PLATFORM_APP_ARN /* from step 1 */,
    Token: deviceToken,
  };

  const command = new CreatePlatformEndpointCommand(params);
  const response = await client.send(command);
  console.log("Response application end point:: ", response);
  return response.EndpointArn;
}

const subscribeDeviceToTopic = async (endpointArn) => {
  const params = {
    Protocol: "application",
    TopicArn: process.env.SNS_TOPIC_ARN /* from step 2 */,
    Endpoint: endpointArn,
  };

  const command = new SubscribeCommand(params);
  const response = await client.send(command);
  return response.SubscriptionArn;
};
