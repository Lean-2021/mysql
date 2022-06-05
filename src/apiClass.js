import knex from 'knex';

export default class Products {
    constructor(options,table) {
       this.knex = knex(options);
       this.table = table;
    };

    async getAll() {
        try {
            const all = await this.knex.from(this.table).select('*');
            return all
        } catch (error) {
            throw new Error('No se puede obtener los datos',error);
        }
    };

    async create(product) {
        try {
            const newProduct = await this.knex.from(this.table).insert(product);
            return newProduct;
        } catch (error) {
            throw new Error('No se pudieron guardar los datos',error);
        };
    }
}
