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
					{
						name: 'Related Item',
						value: 'relatedItem',
					},
					{
						name: 'Knowledge Base',
						value: 'knowledgeBase',
					},
					{
						name: 'Policy',
						value: 'policy',
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
					{
						name: 'Create Integrity Check Job',
						value: 'createIntegrityCheckJob',
						description: 'Create a backup integrity check job',
						action: 'Create a backup integrity check job',
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

			// Related Items operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'relatedItem',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a relation between entities',
						action: 'Create a relation between entities',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a relation',
						action: 'Delete a relation',
					},
					{
						name: 'Get By Entity',
						value: 'getByEntity',
						description: 'Get related items for an entity',
						action: 'Get related items for an entity',
					},
					{
						name: 'Get By Entity Type',
						value: 'getByEntityType',
						description: 'Get related items for an entity type',
						action: 'Get related items for an entity type',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Entity Type',
				name: 'entityType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'relatedItem',
						],
						operation: [
							'create',
							'getByEntity',
							'getByEntityType',
						],
					},
				},
				options: [
					{
						name: 'Organization',
						value: 'ORGANIZATION',
					},
					{
						name: 'Document',
						value: 'DOCUMENT',
					},
					{
						name: 'Location',
						value: 'LOCATION',
					},
					{
						name: 'Node',
						value: 'NODE',
					},
					{
						name: 'Checklist',
						value: 'CHECKLIST',
					},
					{
						name: 'KB Document',
						value: 'KB_DOCUMENT',
					},
				],
				default: 'ORGANIZATION',
			},
			{
				displayName: 'Entity ID',
				name: 'entityId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'relatedItem',
						],
						operation: [
							'create',
							'getByEntity',
						],
					},
				},
				default: 0,
				description: 'ID of the entity',
			},
			{
				displayName: 'Related Item ID',
				name: 'relatedItemId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'relatedItem',
						],
						operation: [
							'delete',
						],
					},
				},
				default: 0,
				description: 'ID of the related item to delete',
			},
			// Backup operations
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
						name: 'Get Integrity Check Jobs',
						value: 'getIntegrityCheckJobs',
						description: 'Get a list of integrity check jobs',
						action: 'Get a list of integrity check jobs',
					},
					{
						name: 'Create Integrity Check Job',
						value: 'createIntegrityCheckJob',
						description: 'Create an integrity check job',
						action: 'Create an integrity check job',
					},
				],
				default: 'getIntegrityCheckJobs',
			},
			{
				displayName: 'Device ID',
				name: 'deviceId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'backup',
						],
						operation: [
							'createIntegrityCheckJob',
						],
					},
				},
				default: 0,
				description: 'ID of the device to check',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'backup',
						],
						operation: [
							'getIntegrityCheckJobs',
						],
					},
				},
				options: [
					{
						displayName: 'Device Filter',
						name: 'df',
						type: 'string',
						default: '',
						description: 'Device filter',
					},
					{
						displayName: 'Deleted Device Filter',
						name: 'ddf',
						type: 'string',
						default: '',
						description: 'Deleted device filter',
					},
					{
						displayName: 'Status Filter',
						name: 'sf',
						type: 'string',
						default: '',
						description: 'Backup job status filter',
					},
					{
						displayName: 'Plan Type Filter',
						name: 'ptf',
						type: 'string',
						default: '',
						description: 'Backup job planType filter',
					},
					{
						displayName: 'Start Time Filter',
						name: 'stf',
						type: 'string',
						default: '',
						description: 'Backup job startTime filter',
					},
					{
						displayName: 'Include',
						name: 'include',
						type: 'options',
						options: [
							{
								name: 'Active',
								value: 'active',
							},
							{
								name: 'Deleted',
								value: 'deleted',
							},
							{
								name: 'All',
								value: 'all',
							},
						],
						default: 'active',
						description: 'Which devices to include',
					},
					{
						displayName: 'Page Size',
						name: 'pageSize',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 10000,
						},
						default: 10000,
						description: 'Number of records per page',
					},
				],
			},
			// OPERATIONS - POLICY
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'policy',
						],
					},
				},
				options: [
					{
						name: 'Get Custom Fields Conditions',
						value: 'getCustomFieldsConditions',
						description: 'Get custom fields policy conditions',
						action: 'Get custom fields policy conditions',
					},
					{
						name: 'Create Custom Fields Condition',
						value: 'createCustomFieldsCondition',
						description: 'Create custom fields policy condition',
						action: 'Create custom fields policy condition',
					},
					{
						name: 'Get Windows Event Conditions',
						value: 'getWindowsEventConditions',
						description: 'Get Windows event policy conditions',
						action: 'Get Windows event policy conditions',
					},
					{
						name: 'Create Windows Event Condition',
						value: 'createWindowsEventCondition',
						description: 'Create Windows event policy condition',
						action: 'Create Windows event policy condition',
					},
					{
						name: 'Delete Condition',
						value: 'deleteCondition',
						description: 'Delete a policy condition',
						action: 'Delete a policy condition',
					},
					{
						name: 'Update Organization Policies',
						value: 'updateOrganizationPolicies',
						description: 'Update organization policies',
						action: 'Update organization policies',
					},
				],
				default: 'getCustomFieldsConditions',
			},
			{
				displayName: 'Policy ID',
				name: 'policyId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'policy',
						],
						operation: [
							'getCustomFieldsConditions',
							'createCustomFieldsCondition',
							'getWindowsEventConditions',
							'createWindowsEventCondition',
							'deleteCondition',
						],
					},
				},
				default: '',
				description: 'ID of the policy',
			},
			{
				displayName: 'Condition',
				name: 'condition',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'policy',
						],
						operation: [
							'createCustomFieldsCondition',
							'createWindowsEventCondition',
						],
					},
				},
				default: '',
				description: 'Policy condition to create',
			},
			{
				displayName: 'Condition ID',
				name: 'conditionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'policy',
						],
						operation: [
							'deleteCondition',
						],
					},
				},
				default: '',
				description: 'ID of the condition to delete',
			},
			{
				displayName: 'Organization ID',
				name: 'organizationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'policy',
						],
						operation: [
							'updateOrganizationPolicies',
						],
					},
				},
				default: '',
				description: 'ID of the organization',
			},
			{
				displayName: 'Policies',
				name: 'policies',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'policy',
						],
						operation: [
							'updateOrganizationPolicies',
						],
					},
				},
				default: '',
				description: 'Policy update information',
			},
			// OPERATIONS - KNOWLEDGE BASE
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'knowledgeBase',
						],
					},
				},
				options: [
					{
						name: 'Create Articles',
						value: 'createArticles',
						description: 'Create knowledge base articles',
						action: 'Create knowledge base articles',
					},
					{
						name: 'Update Articles',
						value: 'updateArticles',
						description: 'Update knowledge base articles',
						action: 'Update knowledge base articles',
					},
					{
						name: 'Delete Articles',
						value: 'deleteArticles',
						description: 'Delete knowledge base articles',
						action: 'Delete knowledge base articles',
					},
					{
						name: 'Download Article',
						value: 'downloadArticle',
						description: 'Download a knowledge base article',
						action: 'Download a knowledge base article',
					},
					{
						name: 'Archive Folders',
						value: 'archiveFolders',
						description: 'Archive knowledge base folders',
						action: 'Archive knowledge base folders',
					},
					{
						name: 'Delete Folders',
						value: 'deleteFolders',
						description: 'Delete knowledge base folders',
						action: 'Delete knowledge base folders',
					},
					{
						name: 'Get Folder',
						value: 'getFolder',
						description: 'Get a knowledge base folder',
						action: 'Get a knowledge base folder',
					},
					{
						name: 'Upload Articles',
						value: 'uploadArticles',
						description: 'Upload knowledge base articles with attachments',
						action: 'Upload knowledge base articles',
					},
				],
				default: 'createArticles',
			},
			// Knowledge Base - Article Parameters
			{
				displayName: 'Articles',
				name: 'articles',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['knowledgeBase'],
						operation: ['createArticles', 'updateArticles'],
					},
				},
				default: '',
				description: 'Articles to create or update',
			},
			{
				displayName: 'Article IDs',
				name: 'articleIds',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['knowledgeBase'],
						operation: ['deleteArticles'],
					},
				},
				default: '',
				description: 'IDs of articles to delete',
			},
			{
				displayName: 'Article ID',
				name: 'articleId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['knowledgeBase'],
						operation: ['downloadArticle'],
					},
				},
				default: '',
				description: 'ID of article to download',
			},
			// Knowledge Base - Folder Parameters
			{
				displayName: 'Folder IDs',
				name: 'folderIds',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['knowledgeBase'],
						operation: ['archiveFolders', 'deleteFolders'],
					},
				},
				default: '',
				description: 'IDs of folders to archive or delete',
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['knowledgeBase'],
						operation: ['getFolder'],
					},
				},
				default: '',
				description: 'ID of folder to retrieve',
			},
			{
				displayName: 'Binary Property',
				name: 'binaryPropertyName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['knowledgeBase'],
						operation: ['uploadArticles'],
					},
				},
				default: 'data',
				description: 'Name of the binary property containing the file data to upload',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;

		for (let i = 0; i < length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const options: IRequestOptions = {
					headers: {},
					method: 'GET' as IHttpRequestMethods,
					body: {},
					uri: '',
					json: true,
				};

				if (resource === 'policy') {
					if (operation === 'getCustomFieldsConditions') {
						const policyId = this.getNodeParameter('policyId', i) as string;
						options.method = 'GET';
						options.uri = `/v2/policies/${policyId}/condition/custom-fields`;
					}
					else if (operation === 'createCustomFieldsCondition') {
						const policyId = this.getNodeParameter('policyId', i) as string;
						options.method = 'POST';
						options.uri = `/v2/policies/${policyId}/condition/custom-fields`;
						options.body = this.getNodeParameter('condition', i) as object;
					}
					else if (operation === 'getWindowsEventConditions') {
						const policyId = this.getNodeParameter('policyId', i) as string;
						options.method = 'GET';
						options.uri = `/v2/policies/${policyId}/condition/windows-event`;
					}
					else if (operation === 'createWindowsEventCondition') {
						const policyId = this.getNodeParameter('policyId', i) as string;
						options.method = 'POST';
						options.uri = `/v2/policies/${policyId}/condition/windows-event`;
						options.body = this.getNodeParameter('condition', i) as object;
					}
					else if (operation === 'deleteCondition') {
						const policyId = this.getNodeParameter('policyId', i) as string;
						const conditionId = this.getNodeParameter('conditionId', i) as string;
						options.method = 'DELETE';
						options.uri = `/v2/policies/${policyId}/condition/${conditionId}`;
					}
					else if (operation === 'updateOrganizationPolicies') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						options.method = 'PUT';
						options.uri = `/v2/organization/${organizationId}/policies`;
						options.body = this.getNodeParameter('policies', i) as object;
					}
				}
				else if (resource === 'knowledgeBase') {
					if (operation === 'createArticles') {
						options.method = 'POST';
						options.uri = '/v2/knowledgebase/articles';
						options.body = this.getNodeParameter('articles', i) as object;
					}
					else if (operation === 'updateArticles') {
						options.method = 'PATCH';
						options.uri = '/v2/knowledgebase/articles';
						options.body = this.getNodeParameter('articles', i) as object;
					}
					else if (operation === 'deleteArticles') {
						options.method = 'POST';
						options.uri = '/v2/knowledgebase/articles/delete';
						options.body = this.getNodeParameter('articleIds', i) as object;
					}
					else if (operation === 'downloadArticle') {
						const articleId = this.getNodeParameter('articleId', i) as string;
						options.method = 'GET';
						options.uri = `/v2/knowledgebase/article/${articleId}/download`;
					}
					else if (operation === 'archiveFolders') {
						options.method = 'POST';
						options.uri = '/v2/knowledgebase/folders/archive';
						options.body = this.getNodeParameter('folderIds', i) as object;
					}
					else if (operation === 'deleteFolders') {
						options.method = 'POST';
						options.uri = '/v2/knowledgebase/folders/delete';
						options.body = this.getNodeParameter('folderIds', i) as object;
					}
					else if (operation === 'getFolder') {
						const folderId = this.getNodeParameter('folderId', i) as string;
						options.method = 'GET';
						options.uri = `/v2/knowledgebase/folder/${folderId}`;
					}
					else if (operation === 'uploadArticles') {
						options.method = 'POST';
						options.uri = '/v2/knowledgebase/articles/upload';
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
						const binaryData = items[i].binary as IDataObject;
						if (binaryData === undefined) {
							throw new NodeOperationError(this.getNode(), 'No binary data exists on item!', {
								itemIndex: i,
							});
						}
						if (binaryData[binaryPropertyName] === undefined) {
							throw new NodeOperationError(
								this.getNode(),
								`No binary data property "${binaryPropertyName}" does not exists on item!`,
								{ itemIndex: i },
							);
						}
						options.body = {
							file: await this.helpers.getBinaryDataBuffer(i, binaryPropertyName),
						};
					}
				}

				const responseData = await this.helpers.requestWithAuthentication.call(
					this,
					'ninjaOneApi',
					options,
				);

				returnData.push({ json: responseData });
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
