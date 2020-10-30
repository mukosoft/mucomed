import { Datastore } from 'react-native-local-mongodb';

export default class AbstractMongoDocument {
    db:Datastore;

    get(query = {}) {
        return this.db.findAsync(query);
    };

    add(document) {
        return this.db.insertAsync(document);
    };

    delete(query = {}) {
        return this.db.removeAsync(query, { multi: true});
    };

    update(query, document) {
        return this.db.updateAsync(query, document);
    };
}