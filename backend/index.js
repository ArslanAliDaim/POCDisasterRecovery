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
  accessKeyId: "ASIA4IBUQXOU7Q3HFYOY",
  secretAccessKey: "+w4uTZW2oE8n/VFmBEt8aAINHcs90iVAHeyQx5J2",
  sessionToken:
    "IQoJb3JpZ2luX2VjEGYaCXVzLWVhc3QtMSJHMEUCICijX5eN1aU5DH0tn8tbdvKSmVIcwEgrV2V8QHP9yGiFAiEAmw7bvYl+HPIUejbvEmJDy+dx555aw6d1CVGTvJiSHewqlQMIbhADGgw4NDE5MjM3Mzg1MzciDKLSScRd2pHbqp/tvyryAvw2q0PvNI1F4V9UJhDL3SVO9ugLNH3j5B6erDgeVZ/FZCS0+YatsqqAXgplXjuXXd6MaFePM6IBigu2Sz+CZTvC0seOkjxRCUlVHc17GrYbUy+RtxDl3py1EZ8umbI2/eCw5s/iRrEgvuo+qLHFkODhvHtdxA191vh0/WoyJfOtJXoeB4qK4fIJ3v2hgMrUw170RLS36vVc6aP6MpLER7H1aD/VIrGTLfLp2qfQjkBJwoU4LiN8fPnPG7hHOXOmxP+Q3vIfeaQiMDTxAYCDj9U0ZBDyZsZEJ+7cjw8KDWhUKzc9nsEt2VRlgLt3JIM/ASFRVqjvA/t8EbwZX5ABy2BBNGhLS6EmZRvPrW9145/Qo4z8hBYSIyDo5gjtbIN3gZA1YZhw2fbk1auW6l8pPATfCg7Zw5hBjnVZSmN10M9FemXrivvbp6E1ZGUVjNOM3jLEAE55qRj/RyTTKABI3L/CDqG5rYGO/NhlPFYWqt5Qyykwh5DKrwY6pgH0PHGriqEEJqITMSFSSNK8W3CvLzRXlchb2gUOdNd1Nyks3xmxUk1UomKNgzIoRhnUL5sZ/MG3lI675/z6YdRi1Io+gdOQFkOrnHBDGBwtXuXRRJBWE+KIR53r2f26zMwoZi+7VvHLpppZXGOkpgRcWI/WO6VDtjvaT2ntUcStX+tl9qkSHF7vkK/3V5qsi9+U0DoUeY74mcpTkcZWjH+guMyIDIuf",
};

const REGION = "us-west-2";

const client = new ConnectClient({ region: REGION, credentials: CREDENTIALS });

exports.handler = async (event, context, callback) => {
  try {
    // Parse the request body
    console.log("EventLLL:::::: ", event);
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
      headers: { "Content-Type": "application/json" },
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
