export type Database = {
    name: string
}

export type ActiveTab = {
    index?: number,
    database?: string
}

export type Data = {
    databases: Promise<Database[]> | [],
    fields: Promise<{}> | {}
}

export type State = {
    saving: boolean,
    creating: boolean,
    deletingDatabase: boolean
}