/**
 * @name command.ts
 * Message Pattern matches Pub/Sub requests according to a command name
 * To ensure consistency and proper typing support all commands to our services should retrieve their name/identity/id
 * from this file. Think of it as a comprehensive route definition
 */

export default {
    CreateWarehouse: 'CREATE_WAREHOUSE',
    CreateDatasource: 'CREATE_DATASOURCE',
    GetDatasource: 'GET_DATASOURCE',
    GetAllDatasources: 'GET_ALL_DATASOURCES',
    UpdateDatasource: 'UPDATE_DATASOURCE',
    DeleteDatasource: 'DELETE_DATASOURCE'
}


export enum CommandRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    EDITOR = 'editor'
}


export enum CommandCaller {
    API = 'orbit.kpilens.com',
    WAREHOUSE = 'io.warehouse.kpilens.com',
    BILLING = 'io.billing.kpilens.com',
    HEADER = 'x-wsp-id'
}