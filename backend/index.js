const {
  ConnectClient,
  ReplicateInstanceCommand,
  CreateTrafficDistributionGroupCommand,
  ListTrafficDistributionGroupsCommand,
  SearchAvailablePhoneNumbersCommand,
  ClaimPhoneNumberCommand,
  DescribeTrafficDistributionGroupCommand,
} = require("@aws-sdk/client-connect");

const CREDENTIALS = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  sessionToken: process.env.sessionToken,
};

const REGION = process.env.REGION;

const client = new ConnectClient({ region: REGION, credentials: CREDENTIALS });

exports.handler = async (event, context, callback) => {
  try {
    // Parse the request body
    console.log(event);
    let response = {};
    switch (event.resource) {
      case "/poc":
        response = await poc(event);
        break;
      case "/phone-number/available-phone-no":
        response = await availablePhoneNumber(event);
        break;
      case "/phone-number/claim-phone-number":
        response = await claimPhoneNumber(JSON.parse(event.body));
        break;
      case "/disaster":
        response = await disaster(event.body);
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
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
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

async function poc(event) {
  try {
    let response = {};
    switch (event.httpMethod) {
      case "GET":
        // Id means Instance Id
        if (event?.pathParameters?.id) {
          response = await getListTraficDistribution(event?.pathParameters?.id);
        }
        break;
      case "POST":
        if (event?.pathParameters?.id) {
          response = await createTrafficDistributionGroup(
            JSON.parse(event.body)
          );
        } else {
          response = await replicateInstance(JSON.parse(event.body));
        }
        break;
      default:
        throw new Error(`Unsupported route: “${event.httpMethod}”`);
    }
    return response;
  } catch (error) {
    throw error;
  }
}

async function availablePhoneNumber(event) {
  try {
    let response = {};
    const { countryCode, type, InstanceId } = event?.queryStringParameters;
    if (countryCode && type && InstanceId) {
      response = await searchPhoneNumberAvaliable(
        countryCode,
        type,
        InstanceId
      );
    }
    return response;
  } catch (error) {
    throw error;
  }
}

async function claimPhoneNumber(data) {
  try {
    const command = new ClaimPhoneNumberCommand(data);
    const response = await client.send(command);
    return response;
  } catch (error) {
    throw error;
  }
}

async function getListTraficDistribution(id) {
  try {
    const params = {
      InstanceId: id,
      MaxResults: 10,
    };
    const command = new ListTrafficDistributionGroupsCommand(params);
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.log("Error in list", error);
    throw error;
  }
}

async function replicateInstance(data) {
  if (data) {
    try {
      //   const command = new ReplicateInstanceCommand(data);
      //   const response = await client.send(command);
      //   return response;
      return {
        arn: "data",
        Id: data.InstanceId,
      };
    } catch (error) {
      console.log("Error during replicate Instance", error);
      throw error;
    }
  }
}

async function createTrafficDistributionGroup(data) {
  if (data) {
    try {
      const command = new CreateTrafficDistributionGroupCommand(data);
      const response = await client.send(command);
      return response;
    } catch (error) {
        console.log("Error in create traffic distribution group", error)
      throw error;
    }
  }
}

async function describeTrafficDistributionGroup(id) {
  try {
    const command = new DescribeTrafficDistributionGroupCommand({
      TrafficDistributionGroupId: id,
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    throw error;
  }
}

async function searchPhoneNumberAvaliable(countryCode, type, InstanceId) {
  try {
    const input = {
      PhoneNumberCountryCode: countryCode || "US",
      PhoneNumberType: type || "TOLL_FREE",
      InstanceId: InstanceId,
    };
    const command = new SearchAvailablePhoneNumbersCommand(input);
    const response = await client.send(command);
    return response;
  } catch (error) {
    throw error;
  }
}

async function disaster(data) {
  try {
    let response = {};
    if (data) {
      const eventBody = JSON.parse(data);

      const replicaInput = {
        InstanceId: eventBody?.InstanceId,
        ReplicaRegion: eventBody?.ReplicaRegion,
        ReplicaAlias: eventBody?.ReplicaAlias,
      };

      const replicaResponse = await replicateInstance(replicaInput);
      response.replicateInstance = replicaResponse;

      if (eventBody?.trafficDistributionGroup && replicaResponse?.Id) {
        const trafficDistributionGroupInput = eventBody.trafficDistributionGroup;
        trafficDistributionGroupInput.InstanceId = replicaResponse.Id;

        const trafficDistributionGroupReponse = await createTrafficDistributionGroup(trafficDistributionGroupInput);
        
        response.trafficDistributionGroup = {
          Arn: trafficDistributionGroupReponse.Arn,
          Id: trafficDistributionGroupReponse.Id
        };

        if (
          eventBody?.claimPhoneNumber &&
          trafficDistributionGroupReponse?.$metadata?.httpStatusCode === 200
        ) {

          const describeTrafficGroupResponse = await describeTrafficDistributionGroup(trafficDistributionGroupReponse.Id);
          
          response.describeTrafficDistributionGroup = describeTrafficGroupResponse?.TrafficDistributionGroup;

          if (
            describeTrafficGroupResponse?.$metadata?.httpStatusCode === 200 &&
            describeTrafficGroupResponse?.TrafficDistributionGroup?.Status ===
              "ACTIVE"
          ) {
            // We can claim phone number if the status of traffic distribution group is active
            const claimPhoneNoInput = eventBody.claimPhoneNumber;
            claimPhoneNoInput.InstanceId = replicaResponse.Id;

            // const claimPhoneNoResponse = await claimPhoneNumber(
            //   claimPhoneNoInput
            // );

            // response.claimPhoneNumber = claimPhoneNoResponse;
            
          } else {
            response.message = "Traffic distribution group creation in progress";
          }
        }
      }
    } else {
      throw new Error(`Please fill required body`);
    }
    return response;
  } catch (error) {
    throw error;
  }
}
