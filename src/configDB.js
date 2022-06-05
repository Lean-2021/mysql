export const options ={
    mariaDB:{
        client:'mysql',
        connection:{
            host:'127.0.0.1',
            user:'root',
            password:'Admin1234',
            database:'ecommerce'
        },
        pool:{
            min:0,
            max:8
        }
    },
    sqlite3:{
        client:'sqlite3',
        connection:{
            filename:'./src/DB/ecommerce.sqlite'
        },
        useNullAsDefault:true
    }
}