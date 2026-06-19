const awsConfig = {
    Auth: {
        Cognito: {
            region: "ap-south-1",
            userPoolId: "ap-south-1_UPl4sHgBH",
            userPoolClientId: "2ki03mpqm9f7c88o8ric93kv24",
            mandatorySignIn: true,
        }
    }
};

export const API_BASE_URL =
    "https://18sft68stl.execute-api.ap-south-1.amazonaws.com/prod";

export default awsConfig;