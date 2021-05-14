interface DocumentationMeta {
	generator: string;
	format: number;
	date: number;
}

interface DocumentationClassMeta {
	line: number;
	file: string;
	path: string;
}
type DocumentationClassMethodMeta = DocumentationClassMeta;
type DocumentationClassMethodParameterMeta = DocumentationClassMeta;
type DocumentationClassMethodPropertyMeta = DocumentationClassMeta;
type DocumentationClassEventMeta = DocumentationClassMeta;
type DocumentationExternalMeta = DocumentationClassMeta;
type DocumentationTypedefinitionMeta = DocumentationClassMeta;

interface DocumentationClassConstructorParameter {
	name: string;
	description: string;
	default: any;
	optional: boolean;
	type: string[];
}

interface DocumentationClassConstructor {
	name: string;
	params: DocumentationClassConstructorParameter[];
}

export interface DocumentationClassProperty {
	name: string;
	description: string;
	readonly?: boolean;
	nullable: boolean;
	scope?: string;
	see?: string[];
	type: string[];
	meta: DocumentationClassMethodPropertyMeta;
}

interface DocumentationClassMethodParameter {
	name: string;
	description: string;
	type: string[];
	meta: DocumentationClassMethodParameterMeta;
}

export interface DocumentationClassMethod {
	name: string;
	description: string;
	access?: string;
	async?: boolean;
	inherited?: boolean;
	scope?: string;
	params: DocumentationClassMethodParameter[];
	examples?: string[];
	returns: string[] | { type: string[]; nullable: boolean };
	meta: DocumentationClassMethodMeta;
}

interface DocumentationClassEventParameter {
	name: string;
	description: string;
	type: string[];
}

interface DocumentationClassEvent {
	name: string;
	description: string;
	params: DocumentationClassEventParameter[];
	meta: DocumentationClassEventMeta;
}

interface DocumentationClass {
	name: string;
	description: string;
	construct: DocumentationClassConstructor;
	abstract: boolean;
	extends: string[];
	implements: string[];
	props: DocumentationClassProperty[];
	methods: DocumentationClassMethod[];
	events: DocumentationClassEvent[];
	meta: DocumentationClassMeta;
}

export interface DocumentationCustomFile {
	name: string;
	content: string;
	type: string;
	path: string;
}

interface DocumentationCustom {
	[key: string]: {
		name: string;
		files: {
			[key: string]: DocumentationCustomFile;
		};
	};
}

interface DocumentationExternal {
	name: string;
	see: string[];
	meta: DocumentationExternalMeta;
}

type DocumentationInterface = DocumentationClass;

enum DocumentationLinkParams {
	class = 'class',
	typedef = 'typedef',
}
interface DocumentationLink {
	[key: string]:
		| {
				name: string;
				params: {
					[key in DocumentationLinkParams]: string;
				};
		  }
		| string;
}

interface DocumentationTypeDefinitionProperty {
	name: string;
	description: string;
	optional: boolean;
	type: string[];
}

interface DocumentationTypeDefinition {
	name: string;
	description: string;
	props: DocumentationTypeDefinitionProperty[];
	type: string[];
	meta: DocumentationTypedefinitionMeta;
}

export interface Documentation {
	classes: DocumentationClass[];
	custom: DocumentationCustom[];
	externals: DocumentationExternal[];
	global: string;
	interfaces: DocumentationInterface[];
	links: DocumentationLink[];
	meta: DocumentationMeta;
	id: string;
	source: string;
	tag: string;
	typedefs: DocumentationTypeDefinition[];
}
