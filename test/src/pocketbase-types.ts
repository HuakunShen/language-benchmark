/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Algorithms = "algorithms",
	Languages = "languages",
	Measurements = "measurements",
	Platforms = "platforms",
	Runs = "runs",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type AlgorithmsRecord = {
	created?: IsoDateString
	description?: string
	id: string
	name: string
	updated?: IsoDateString
}

export type LanguagesRecord = {
	created?: IsoDateString
	id: string
	name: string
	updated?: IsoDateString
	version: string
}

export type MeasurementsRecord = {
	code_start_ms: number
	created?: IsoDateString
	id: string
	ram_usage_kb?: number
	run?: RecordIdString
	time_ms: number
	updated?: IsoDateString
}

export type PlatformsRecord<Tinfo = unknown> = {
	architecture: string
	created?: IsoDateString
	id: string
	info?: null | Tinfo
	name: string
	updated?: IsoDateString
	version: string
}

export type RunsRecord = {
	algorithm: RecordIdString
	commit_sha: string
	created?: IsoDateString
	id: string
	language: RecordIdString
	platform: RecordIdString
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type AlgorithmsResponse<Texpand = unknown> = Required<AlgorithmsRecord> & BaseSystemFields<Texpand>
export type LanguagesResponse<Texpand = unknown> = Required<LanguagesRecord> & BaseSystemFields<Texpand>
export type MeasurementsResponse<Texpand = unknown> = Required<MeasurementsRecord> & BaseSystemFields<Texpand>
export type PlatformsResponse<Tinfo = unknown, Texpand = unknown> = Required<PlatformsRecord<Tinfo>> & BaseSystemFields<Texpand>
export type RunsResponse<Texpand = unknown> = Required<RunsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	algorithms: AlgorithmsRecord
	languages: LanguagesRecord
	measurements: MeasurementsRecord
	platforms: PlatformsRecord
	runs: RunsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	algorithms: AlgorithmsResponse
	languages: LanguagesResponse
	measurements: MeasurementsResponse
	platforms: PlatformsResponse
	runs: RunsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'algorithms'): RecordService<AlgorithmsResponse>
	collection(idOrName: 'languages'): RecordService<LanguagesResponse>
	collection(idOrName: 'measurements'): RecordService<MeasurementsResponse>
	collection(idOrName: 'platforms'): RecordService<PlatformsResponse>
	collection(idOrName: 'runs'): RecordService<RunsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
