import { SQLite } from "expo-sqlite"

//initialize database
const db = SQLite.openDatabase('places.db')

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((transactionQuery) => {
            const query = 'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TETX NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);'
            transactionQuery.executeSql(query,
            [],
            //if query is successful
            () => {
                resolve()
            },
            //if query failed
            (_, err) => {
                reject(err)
            }
            )
        })
    })
    return promise
}

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((transactionQuery) => {
            const query = 'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?);'
            transactionQuery.executeSql(query,
            [title, imageUri, address, lat, lng],
            //if query is successful
            (_, result) => {
                resolve(result)
            },
            //if query failed
            (_, err) => {
                reject(err)
            }
            )
        })
    })
    return promise
}

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((transactionQuery) => {
            const query = 'SELECT * FROM places;'
            transactionQuery.executeSql(query,
            [],
            //if query is successful
            (_, result) => {
                resolve(result)
            },
            //if query failed
            (_, err) => {
                reject(err)
            }
            )
        })
    })
    return promise
}