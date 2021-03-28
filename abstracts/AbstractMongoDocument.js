import { Datastore } from 'react-native-local-mongodb';

/**
 * Uses the react-native-local-mongodb package and creats an abstract
 * class for CRUD functions. Each mongo document inherits from this 
 * class, to avoid unnecessary duplicated source code.
 * 
 * @see https://github.com/antoniopresto/react-native-local-mongodb
 * @author Dominique Börner (dominique@mukosoft.de)
 */
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