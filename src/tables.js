import knex from 'knex';
import {options} from './configDB.js';

export const tableProducts=async()=>{  // crear tabla productos en mariaDB
    try {
        await knex(options.mariaDB).schema.dropTableIfExists('productos');
        await knex(options.mariaDB).schema.createTable('productos',(table)=>{
            table.increments('id').notNullable().unique();
            table.string('title').notNullable();
            table.float('price').notNullable();
            table.string('thumbnail').notNullable();
        })
        console.log('Table Productos created in mariaDB');
    } catch (error) {
        throw new Error ('Error al crear la tabla en mariaDB',error);
    }
}

export const tableMessages=async()=>{
    try {
        await knex(options.sqlite3).schema.dropTableIfExists('mensajes');
        await knex(options.sqlite3).schema.createTable('mensajes',(table)=>{
            table.increments('id').unique().notNullable();
            table.string('email').notNullable();
            table.string('dateTime').notNullable();
            table.string('message').notNullable();
        });
        console.log('Table mensajes created in sqlite3');    
    } catch (error) {
        throw new Error ('Error al crear la tabla en sqlite3',error);
    }
}