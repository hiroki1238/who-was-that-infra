import { Amplify } from "aws-amplify";

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "",
      identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID || "",
      loginWith: {
        email: true,
        username: false,
      },
      signUpVerificationMethod: "code" as const,
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: false,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
  API: {
    REST: {
      "who-was-that-api": {
        endpoint:
          process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8080",
        region: process.env.NEXT_PUBLIC_AWS_REGION || "ap-northeast-1",
      },
    },
  },
};

Amplify.configure(awsConfig);

export default awsConfig;
