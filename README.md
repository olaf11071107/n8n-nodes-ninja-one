# n8n-nodes-ninjaone

This is an n8n community node for integrating with the NinjaOne API. It provides a simple way to interact with the NinjaOne API using OAuth2 authentication.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### From n8n

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Select **Install**
4. Enter `n8n-nodes-ninjaone` in **Enter npm package name**
5. Agree to the risks of using community nodes and click **Install**

### Manually

1. Clone this repository
2. Navigate to the repository directory
3. Run `npm install`
4. Run `npm run build`
5. Link or copy the built files to your n8n installation's node directory

## Operations

### User

* **Create** - Create a new user
* **Delete** - Delete an existing user
* **Get** - Retrieve a specific user by ID
* **Get Many** - Retrieve multiple users with optional limit
* **Update** - Update an existing user's information

## Credentials

### NinjaOne OAuth2 API

To use this node, you need to set up OAuth2 authentication with NinjaOne:

1. Register an application in the NinjaOne developer portal
2. Configure the OAuth2 settings:
   - **Client ID**: Your application's client ID
   - **Client Secret**: Your application's client secret
   - **Authorization URL**: The OAuth2 authorization endpoint
   - **Access Token URL**: The OAuth2 token endpoint
   - **Scope**: Space-separated list of required scopes (e.g., `read:users write:users`)
   - **Authentication**: Choose between Header or Body authentication
3. Configure the redirect URL in your NinjaOne developer portal to match your n8n instance's OAuth callback URL

## Compatibility

This node has been tested with n8n version 1.0.0 and above.

## Resources

* [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
* [NinjaOne API Documentation](https://example.com/docs) <!-- Replace with actual documentation URL -->
