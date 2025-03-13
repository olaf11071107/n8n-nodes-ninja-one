import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
    NodeConnectionType,
} from 'n8n-workflow';

import type { IDataObject, IRequestOptions, IHttpRequestMethods } from 'n8n-workflow';

export class NinjaOne implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NinjaOne',
		name: 'ninjaOne',
		icon: 'file:ninja-one.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume NinjaOne API',
		defaults: {
			name: 'NinjaOne',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'ninjaOneOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Device',
						value: 'device',
					},
					{
						name: 'Alert',
						value: 'alert',
					},
					{
						name: 'Activity',
						value: 'activity',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Backup',
						value: 'backup',
					},
					{
						name: 'Ticketing',
						value: 'ticketing',
					},
					{
						name: 'Query',
						value: 'query',
					},
					{
						name: 'Job',
						value: 'job',
					},
				],
				default: 'device',
			},
			// OPERATIONS - USER (keeping the original implementation)
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'user',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a user',
						action: 'Create a user',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a user',
						action: 'Delete a user',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a user',
						action: 'Get a user',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get many users',
						action: 'Get many users',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a user',
						action: 'Update a user',
					},
				],
				default: 'get',
			},
			// OPERATIONS - DEVICE
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'device',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a device by ID',
						action: 'Get a device',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all devices',
						action: 'Get all devices',
					},
					{
						name: 'Get Alerts',
						value: 'getAlerts',
						description: 'Get device alerts',
						action: 'Get device alerts',
					},
					{
						name: 'Get Activities',
						value: 'getActivities',
						description: 'Get device activities',
						action: 'Get device activities',
					},
					{
						name: 'Get Disks',
						value: 'getDisks',
						description: 'Get device disks',
						action: 'Get device disks',
					},
					{
						name: 'Get Network Interfaces',
						value: 'getNetworkInterfaces',
						description: 'Get device network interfaces',
						action: 'Get device network interfaces',
					},
					{
						name: 'Get Custom Fields',
						value: 'getCustomFields',
						description: 'Get device custom fields',
						action: 'Get device custom fields',
					},
					{
						name: 'Get Software',
						value: 'getSoftware',
						description: 'Get installed software on device',
						action: 'Get device software',
					},
					{
						name: 'Get Processors',
						value: 'getProcessors',
						description: 'Get device processors',
						action: 'Get device processors',
					},
					{
						name: 'Get Volumes',
						value: 'getVolumes',
						description: 'Get device volumes',
						action: 'Get device volumes',
					},
					{
						name: 'Get Windows Services',
						value: 'getWindowsServices',
						description: 'Get Windows services on device',
						action: 'Get device Windows services',
					},
					{
						name: 'Reboot',
						value: 'reboot',
						description: 'Reboot a device',
						action: 'Reboot a device',
					},
					{
						name: 'Run Script',
						value: 'runScript',
						description: 'Run a script on a device',
						action: 'Run script on device',
					},
				],
				default: 'get',
			},
			// OPERATIONS - ALERT
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'alert',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get an alert by ID',
						action: 'Get an alert',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all alerts',
						action: 'Get all alerts',
					},
					{
						name: 'Resolve',
						value: 'resolve',
						description: 'Resolve an alert',
						action: 'Resolve an alert',
					},
				],
				default: 'getAll',
			},
			// OPERATIONS - ACTIVITY
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'activity',
						],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all activities',
						action: 'Get all activities',
					},
				],
				default: 'getAll',
			},
			// OPERATIONS - ORGANIZATION
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'organization',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get an organization by ID',
						action: 'Get an organization',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all organizations',
						action: 'Get all organizations',
					},
					{
						name: 'Get Devices',
						value: 'getDevices',
						description: 'Get devices of an organization',
						action: 'Get organization devices',
					},
					{
						name: 'Get Locations',
						value: 'getLocations',
						description: 'Get locations of an organization',
						action: 'Get organization locations',
					},
					{
						name: 'Get Custom Fields',
						value: 'getCustomFields',
						description: 'Get custom fields of an organization',
						action: 'Get organization custom fields',
					},
				],
				default: 'getAll',
			},
			// OPERATIONS - BACKUP
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'backup',
						],
					},
				},
				options: [
					{
						name: 'Get Overview',
						value: 'getOverview',
						description: 'Get backup overview',
						action: 'Get backup overview',
					},
					{
						name: 'Get Runs',
						value: 'getRuns',
						description: 'Get backup runs',
						action: 'Get backup runs',
					},
					{
						name: 'Get Stats',
						value: 'getStats',
						description: 'Get backup stats',
						action: 'Get backup stats',
					},
					{
						name: 'Get Jobs',
						value: 'getJobs',
						description: 'Get backup jobs',
						action: 'Get backup jobs',
					},
					{
						name: 'Get Integrity Check Jobs',
						value: 'getIntegrityCheckJobs',
						description: 'Get backup integrity check jobs',
						action: 'Get backup integrity check jobs',
					},
				],
				default: 'getOverview',
			},
			// OPERATIONS - TICKETING
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'ticketing',
						],
					},
				},
				options: [
					{
						name: 'Get Boards',
						value: 'getBoards',
						description: 'Get ticketing boards',
						action: 'Get ticketing boards',
					},
					{
						name: 'Get Users',
						value: 'getUsers',
						description: 'Get ticketing users',
						action: 'Get ticketing users',
					},
					{
						name: 'Get Ticket',
						value: 'getTicket',
						description: 'Get a ticket by ID',
						action: 'Get a ticket',
					},
					{
						name: 'Create Ticket',
						value: 'createTicket',
						description: 'Create a new ticket',
						action: 'Create a ticket',
					},
					{
						name: 'Add Comment',
						value: 'addComment',
						description: 'Add a comment to a ticket',
						action: 'Add comment to ticket',
					},
					{
						name: 'Get Statuses',
						value: 'getStatuses',
						description: 'Get ticketing statuses',
						action: 'Get ticketing statuses',
					},
				],
				default: 'getBoards',
			},
			// TICKETING:getTicket, TICKETING:addComment parameters
			{
				displayName: 'Ticket ID',
				name: 'ticketId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the ticket',
				displayOptions: {
					show: {
						resource: [
							'ticketing',
						],
						operation: [
							'getTicket',
							'addComment',
						],
					},
				},
			},

			// TICKETING:createTicket parameters
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				required: true,
				default: '',
				description: 'The title of the ticket',
				displayOptions: {
					show: {
						resource: [
							'ticketing',
						],
						operation: [
							'createTicket',
						],
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				required: true,
				default: '',
				description: 'The description of the ticket',
				displayOptions: {
					show: {
						resource: [
							'ticketing',
						],
						operation: [
							'createTicket',
						],
					},
				},
			},
			{
				displayName: 'Board ID',
				name: 'boardId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the board for the ticket',
				displayOptions: {
					show: {
						resource: [
							'ticketing',
						],
						operation: [
							'createTicket',
						],
					},
				},
			},
			{
				displayName: 'Status ID',
				name: 'statusId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the status for the ticket',
				displayOptions: {
					show: {
						resource: [
							'ticketing',
						],
						operation: [
							'createTicket',
						],
					},
				},
			},
			{
				displayName: 'Priority ID',
				name: 'priorityId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the priority for the ticket',
				displayOptions: {
					show: {
						resource: [
							'ticketing',
						],
						operation: [
							'createTicket',
						],
					},
				},
			},
			{
				displayName: 'Assignee ID',
				name: 'assigneeId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the assignee for the ticket',
				displayOptions: {
					show: {
						resource: [
							'ticketing',
						],
						operation: [
							'createTicket',
						],
					},
				},
			},

			// TICKETING:addComment parameters
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				required: true,
				default: '',
				description: 'The comment to add to the ticket',
				displayOptions: {
					show: {
						resource: [
							'ticketing',
						],
						operation: [
							'addComment',
						],
					},
				},
			},

			// User:getMany
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 10,
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						resource: [
							'user',
						],
						operation: [
							'getMany',
						],
					},
				},
			},

			// User:get
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the user',
				displayOptions: {
					show: {
						resource: [
							'user',
						],
						operation: [
							'get',
							'delete',
							'update',
						],
					},
				},
			},

			// User:create & User:update
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				description: 'Name of the user',
				displayOptions: {
					show: {
						resource: [
							'user',
						],
						operation: [
							'create',
							'update',
						],
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				required: true,
				default: '',
				description: 'Email of the user',
				displayOptions: {
					show: {
						resource: [
							'user',
						],
						operation: [
							'create',
							'update',
						],
					},
				},
			},

			// DEVICE:get, DEVICE:getAlerts, DEVICE:getActivities, DEVICE:getDisks, DEVICE:getNetworkInterfaces
			{
				displayName: 'Device ID',
				name: 'deviceId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the device',
				displayOptions: {
					show: {
						resource: [
							'device',
						],
						operation: [
							'get',
							'getAlerts',
							'getActivities',
							'getDisks',
							'getNetworkInterfaces',
							'getCustomFields',
							'getSoftware',
							'getProcessors',
							'getVolumes',
							'getWindowsServices',
							'reboot',
							'runScript',
						],
					},
				},
			},

			// Parameters for DEVICE:reboot operation
			{
				displayName: 'Reboot Mode',
				name: 'rebootMode',
				type: 'options',
				required: true,
				default: 'NORMAL',
				description: 'The reboot mode to use',
				options: [
					{
						name: 'Normal',
						value: 'NORMAL',
					},
					{
						name: 'Force',
						value: 'FORCE',
					},
				],
				displayOptions: {
					show: {
						resource: [
							'device',
						],
						operation: [
							'reboot',
						],
					},
				},
			},

			// Parameters for DEVICE:runScript operation
			{
				displayName: 'Script',
				name: 'script',
				type: 'string',
				required: true,
				default: '',
				description: 'The script to run on the device',
				displayOptions: {
					show: {
						resource: [
							'device',
						],
						operation: [
							'runScript',
						],
					},
				},
			},
			{
				displayName: 'Script Options',
				name: 'scriptOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'device',
						],
						operation: [
							'runScript',
						],
					},
				},
				options: [
					{
						displayName: 'Timeout (seconds)',
						name: 'timeoutSeconds',
						type: 'number',
						default: 60,
						description: 'The timeout in seconds for script execution',
					},
					{
						displayName: 'Script Type',
						name: 'scriptType',
						type: 'options',
						default: 'BATCH',
						options: [
							{
								name: 'Batch',
								value: 'BATCH',
							},
							{
								name: 'PowerShell',
								value: 'POWERSHELL',
							},
							{
								name: 'Bash',
								value: 'BASH',
							},
						],
						description: 'The type of script to run',
					},
				],
			},

			// ALERT:get, ALERT:reset
			{
				displayName: 'Alert ID',
				name: 'alertId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the alert',
				displayOptions: {
					show: {
						resource: [
							'alert',
						],
						operation: [
							'get',
							'resolve',
						],
					},
				},
			},

			// ORGANIZATION:get
			{
				displayName: 'Organization ID',
				name: 'organizationId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the organization',
				displayOptions: {
					show: {
						resource: [
							'organization',
						],
						operation: [
							'get',
							'getDevices',
							'getLocations',
							'getCustomFields',
						],
					},
				},
			},

			// COMMON: Pagination parameters for getAll operations
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to a specified limit',
				displayOptions: {
					show: {
						operation: [
							'getAll',
							'getJobs',
							'getIntegrityCheckJobs',
							'getBoards',
							'getUsers',
						],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						operation: [
							'getAll',
							'getJobs',
							'getIntegrityCheckJobs',
							'getBoards',
							'getUsers',
						],
						returnAll: [
							false,
						],
					},
				},
			},

			// OPERATIONS - QUERY
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'query',
						],
					},
				},
				options: [
					{
						name: 'Device Health',
						value: 'deviceHealth',
						description: 'Get device health information',
						action: 'Get device health information',
					},
					{
						name: 'Antivirus Status',
						value: 'antivirusStatus',
						description: 'Get antivirus status information',
						action: 'Get antivirus status information',
					},
					{
						name: 'Backup Usage',
						value: 'backupUsage',
						description: 'Get backup usage information',
						action: 'Get backup usage information',
					},
					{
						name: 'Software',
						value: 'software',
						description: 'Get software information',
						action: 'Get software information',
					},
					{
						name: 'Operating Systems',
						value: 'operatingSystems',
						description: 'Get operating systems information',
						action: 'Get operating systems information',
					},
					{
						name: 'OS Patches',
						value: 'osPatches',
						description: 'Get OS patches information',
						action: 'Get OS patches information',
					},
					{
						name: 'Software Patches',
						value: 'softwarePatches',
						description: 'Get software patches information',
						action: 'Get software patches information',
					},
				],
				default: 'deviceHealth',
			},

			// OPERATIONS - JOB
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'job',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a job by ID',
						action: 'Get a job',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all jobs',
						action: 'Get all jobs',
					},
				],
				default: 'getAll',
			},

			// JOB:get
			{
				displayName: 'Job ID',
				name: 'jobId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the job',
				displayOptions: {
					show: {
						resource: [
							'job',
						],
						operation: [
							'get',
						],
					},
				},
			},

			// JOB:getAll
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to a given limit',
				displayOptions: {
					show: {
						resource: [
							'job',
						],
						operation: [
							'getAll',
						],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						resource: [
							'job',
						],
						operation: [
							'getAll',
						],
						returnAll: [
							false,
						],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			// Reset for each iteration
			const qs: IDataObject = {};
			const body: IDataObject = {};
			let method: IHttpRequestMethods = 'GET';
			let url = '';
			let responseData;

			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				// USER operations
				if (resource === 'user') {
					// GET MANY USERS
					if (operation === 'getMany') {
						method = 'GET';
						url = '/users';
						const limit = this.getNodeParameter('limit', i) as number;
						qs.limit = limit;
					}

					// GET SINGLE USER
					else if (operation === 'get') {
						method = 'GET';
						const userId = this.getNodeParameter('userId', i) as string;
						url = `/v2/users/${userId}`;
					}

					// CREATE USER
					else if (operation === 'create') {
						method = 'POST';
						url = '/v2/users';
						const name = this.getNodeParameter('name', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						body.name = name;
						body.email = email;
					}

					// UPDATE USER
					else if (operation === 'update') {
						method = 'PATCH';
						const userId = this.getNodeParameter('userId', i) as string;
						url = `/v2/users/${userId}`;
						const name = this.getNodeParameter('name', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						body.name = name;
						body.email = email;
					}

					// DELETE USER
					else if (operation === 'delete') {
						method = 'DELETE';
						const userId = this.getNodeParameter('userId', i) as string;
						url = `/v2/users/${userId}`;
					}
				}
				// DEVICE operations
				else if (resource === 'device') {
					if (operation === 'get') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}`;
					}
					else if (operation === 'getAll') {
						method = 'GET';
						url = '/v2/devices';
						
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'getAlerts') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}/alerts`;
					}
					else if (operation === 'getActivities') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}/activities`;
					}
					else if (operation === 'getDisks') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}/disks`;
					}
					else if (operation === 'getNetworkInterfaces') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}/network-interfaces`;
					}
					else if (operation === 'getCustomFields') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}/custom-fields`;
					}
					else if (operation === 'getSoftware') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}/software`;
					}
					else if (operation === 'getProcessors') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}/processors`;
					}
					else if (operation === 'getVolumes') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}/volumes`;
					}
					else if (operation === 'getWindowsServices') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}/windows-services`;
					}
					else if (operation === 'reboot') {
						method = 'POST';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						const rebootMode = this.getNodeParameter('rebootMode', i) as string;
						url = `/v2/device/${deviceId}/reboot/${rebootMode}`;
					}
					else if (operation === 'runScript') {
						method = 'POST';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/device/${deviceId}/run-script`;
						const script = this.getNodeParameter('script', i) as string;
						body.script = script;
						const scriptOptions = this.getNodeParameter('scriptOptions', i) as IDataObject;
						if (Object.keys(scriptOptions).length > 0) {
							body.scriptOptions = scriptOptions;
						}
					}
				}
				// ALERT operations
				else if (resource === 'alert') {
					if (operation === 'get') {
						method = 'GET';
						const alertId = this.getNodeParameter('alertId', i) as string;
						url = `/v2/alert/${alertId}`;
					}
					else if (operation === 'getAll') {
						method = 'GET';
						url = '/v2/alerts';
						
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'resolve') {
						method = 'POST';
						const alertId = this.getNodeParameter('alertId', i) as string;
						url = `/v2/alert/${alertId}/reset`;
					}
				}
				// ACTIVITY operations
				else if (resource === 'activity') {
					if (operation === 'getAll') {
						method = 'GET';
						url = '/v2/activities';
						
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
						}
					}
				}
				// ORGANIZATION operations
				else if (resource === 'organization') {
					if (operation === 'get') {
						method = 'GET';
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						url = `/v2/organization/${organizationId}`;
					}
					else if (operation === 'getAll') {
						method = 'GET';
						url = '/v2/organizations';
						
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'getDevices') {
						method = 'GET';
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						url = `/v2/organization/${organizationId}/devices`;
					}
					else if (operation === 'getLocations') {
						method = 'GET';
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						url = `/v2/organization/${organizationId}/locations`;
					}
					else if (operation === 'getCustomFields') {
						method = 'GET';
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						url = `/v2/organization/${organizationId}/custom-fields`;
					}
				}
				// BACKUP operations
				else if (resource === 'backup') {
					if (operation === 'getOverview') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/backup/device/${deviceId}/overview`;
					}
					else if (operation === 'getRuns') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/backup/device/${deviceId}/runs`;
						
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'getStats') {
						method = 'GET';
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						url = `/v2/backup/device/${deviceId}/stats`;
					}
					else if (operation === 'getJobs') {
						method = 'GET';
						url = '/v2/backup/jobs';
						
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'getIntegrityCheckJobs') {
						method = 'GET';
						url = '/v2/backup/integrity-check-jobs';
						
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
						}
					}
				}
				// TICKETING operations
				else if (resource === 'ticketing') {
					if (operation === 'getBoards') {
						method = 'GET';
						url = '/v2/ticketing/trigger/boards';
						
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'getUsers') {
						method = 'GET';
						url = '/v2/ticketing/app-user-contact';
						
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'getTicket') {
						method = 'GET';
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						url = `/v2/ticketing/ticket/${ticketId}`;
					}
					else if (operation === 'createTicket') {
						method = 'POST';
						url = '/v2/ticketing/ticket';
						const title = this.getNodeParameter('title', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const boardId = this.getNodeParameter('boardId', i) as string;
						const statusId = this.getNodeParameter('statusId', i) as string;
						const priorityId = this.getNodeParameter('priorityId', i) as string;
						
						body.title = title;
						body.description = description;
						body.boardId = boardId;
						body.statusId = statusId;
						body.priorityId = priorityId;
						
						// Optional parameters
						const assigneeId = this.getNodeParameter('assigneeId', i, '') as string;
						if (assigneeId) {
							body.assigneeId = assigneeId;
						}
					}
					else if (operation === 'addComment') {
						method = 'POST';
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						url = `/v2/ticketing/ticket/${ticketId}/comment`;
						const comment = this.getNodeParameter('comment', i) as string;
						body.comment = comment;
						
						// Default to public comment
						body.public = true;
					}
					else if (operation === 'getStatuses') {
						method = 'GET';
						url = '/v2/ticketing/statuses';
					}
				}
				// JOB operations
				else if (resource === 'job') {
					if (operation === 'get') {
						method = 'GET';
						const jobId = this.getNodeParameter('jobId', i) as string;
						url = `/v2/job/${jobId}`;
					}
					else if (operation === 'getAll') {
						method = 'GET';
						url = '/v2/jobs';
						
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
						}
					}
				}
				// QUERY operations
				else if (resource === 'query') {
					if (operation === 'deviceHealth') {
						method = 'GET';
						url = '/v2/queries/device-health';
						
						// Add query parameters
						const returnAll = this.getNodeParameter('returnAll', i, true) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i, 100) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'antivirusStatus') {
						method = 'GET';
						url = '/v2/queries/antivirus-status';
						
						// Add query parameters
						const returnAll = this.getNodeParameter('returnAll', i, true) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i, 100) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'backupUsage') {
						method = 'GET';
						url = '/v2/queries/backup-usage';
						
						// Add query parameters
						const returnAll = this.getNodeParameter('returnAll', i, true) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i, 100) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'software') {
						method = 'GET';
						url = '/v2/queries/software';
						
						// Add query parameters
						const returnAll = this.getNodeParameter('returnAll', i, true) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i, 100) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'operatingSystems') {
						method = 'GET';
						url = '/v2/queries/operating-systems';
						
						// Add query parameters
						const returnAll = this.getNodeParameter('returnAll', i, true) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i, 100) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'osPatches') {
						method = 'GET';
						url = '/v2/queries/os-patches';
						
						// Add query parameters
						const returnAll = this.getNodeParameter('returnAll', i, true) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i, 100) as number;
							qs.pageSize = limit;
						}
					}
					else if (operation === 'softwarePatches') {
						method = 'GET';
						url = '/v2/queries/software-patches';
						
						// Add query parameters
						const returnAll = this.getNodeParameter('returnAll', i, true) as boolean;
						if (!returnAll) {
							const limit = this.getNodeParameter('limit', i, 100) as number;
							qs.pageSize = limit;
						}
					}
				}

				// Make the API request
				const credentials = await this.getCredentials('ninjaOneOAuth2Api');

				const options: IRequestOptions = {
					method,
					uri: `${credentials.baseUrl}${url}`,
					json: true,
				};

				// Only add properties if they are not empty
				if (Object.keys(qs).length > 0) {
					options.qs = qs;
				}

				if (Object.keys(body).length > 0) {
					options.body = body;
				}

				try {
					responseData = await this.helpers.requestWithAuthentication.call(
						this,
						'ninjaOneOAuth2Api',
						options,
					);
				} catch (error) {
					throw new NodeOperationError(this.getNode(), `NinjaOne Error: ${error.message}`, { itemIndex: i });
				}

				// Handle the response based on the resource and operation
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
