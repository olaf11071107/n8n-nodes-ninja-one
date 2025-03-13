import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NinjaOneOAuth2Api implements ICredentialType {
	name = 'ninjaOneOAuth2Api';
	displayName = 'NinjaOne OAuth2 API';
	extends = ['oAuth2Api'];
	documentationUrl = 'https://example.com/docs'; // Replace with actual documentation URL
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.example.com/v1',
			required: true,
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'string',
			default: 'https://api.example.com/oauth2/authorize',
			required: true,
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'string',
			default: 'https://api.example.com/oauth2/token',
			required: true,
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: 'read:users write:users',
			required: false,
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					grantType: [
						'authorizationCode',
					],
				},
			},
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'options',
			options: [
				{
					name: 'Body',
					value: 'body',
				},
				{
					name: 'Header',
					value: 'header',
				},
			],
			default: 'header',
		},
	];
}
