// User Interfaces
export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	role: string;
}

// Device Interfaces
export interface IDevice {
	id: string;
	hostname: string;
	organizationId: string;
	systemName: string;
	lastContact?: Date;
	status?: string;
	deviceType?: string;
	tags?: string[];
}

export interface IDeviceDisk {
	id: string;
	deviceId: string;
	name: string;
	model?: string;
	size?: number;
	serial?: string;
}

export interface INetworkInterface {
	id: string;
	deviceId: string;
	name: string;
	macAddress?: string;
	ipAddresses?: string[];
	isUp?: boolean;
}

export interface IProcessor {
	deviceId: string;
	name: string;
	manufacturer?: string;
	cores?: number;
	speed?: number;
}

export interface IVolume {
	deviceId: string;
	name: string;
	fileSystem?: string;
	capacity?: number;
	freeSpace?: number;
}

export interface IWindowsService {
	deviceId: string;
	name: string;
	displayName?: string;
	status?: string;
	startType?: string;
	processId?: number;
}

// Alert Interfaces
export interface IAlert {
	uid: string;
	deviceId?: string;
	severity?: string;
	message?: string;
	status?: string;
	createdOn?: Date;
}

// Activity Interfaces
export interface IActivity {
	id: string;
	deviceId?: string;
	activityType?: string;
	message?: string;
	createdOn?: Date;
}

// Organization Interfaces
export interface IOrganization {
	id: string;
	name: string;
	description?: string;
	status?: string;
}

export interface ILocation {
	id: string;
	organizationId: string;
	name: string;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	postalCode?: string;
}

// Custom Field Interfaces
export interface ICustomField {
	id: string;
	name: string;
	fieldType: string;
	value?: unknown;
	entityType?: string;
	entityId?: string;
}

// Ticketing Interfaces
export interface ITicket {
	id: string;
	title: string;
	description: string;
	boardId: string;
	statusId: string;
	priorityId: string;
	assigneeId?: string;
	createdOn?: Date;
}

export interface ITicketStatus {
	id: string;
	name: string;
	boardId: string;
	color?: string;
}

export interface ITicketComment {
	id: string;
	ticketId: string;
	authorId: string;
	comment: string;
	createdOn: Date;
}

// Job Interfaces
export interface IJob {
	id: string;
	deviceId?: string;
	jobType?: string;
	status?: string;
	createdOn?: Date;
	completedOn?: Date;
}

// Backup Interfaces
export interface IBackupJob {
	id: string;
	deviceId: string;
	status?: string;
	sessionId?: string;
	startTime?: Date;
	endTime?: Date;
	bytesTotal?: number;
	bytesTransferred?: number;
}

// Query Interfaces
export interface IDeviceHealth {
	deviceId: string;
	status: string;
	lastContact?: Date;
	issues?: string[];
	overallHealth?: number;
}

export interface IAntivirusStatus {
	deviceId: string;
	antivirusName?: string;
	status?: string;
	definitions?: string;
	lastUpdate?: Date;
}

export interface ISoftware {
	deviceId: string;
	name: string;
	version?: string;
	publisher?: string;
	installDate?: Date;
	size?: number;
}

export interface IOperatingSystem {
	deviceId: string;
	name: string;
	version?: string;
	architecture?: string;
	buildNumber?: string;
}

export interface IOSPatch {
	deviceId: string;
	name: string;
	kb?: string;
	status?: string;
	severity?: string;
	releaseDate?: Date;
}

export interface ISoftwarePatch {
	deviceId: string;
	softwareName: string;
	patchName: string;
	version?: string;
	status?: string;
	releaseDate?: Date;
}

export interface INodeRequestOptions {
	uri: string;
	method: string;
	body?: object;
	qs?: object;
	headers?: object;
}
