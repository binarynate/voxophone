import NodeFileSystemJsonStorage from './NodeFileSystemJsonStorage';

/**
* Extends NodeFileSystemJsonStorage to provide storage for the `FileInfo` interface, which includes
* a path to a BLOB file.
*/
export default class NodeFileInfoStorage extends NodeFileSystemJsonStorage {

    insert() {

        return super.insert(...arguments)
        .then(entity => {

            let { id } = entity;
            // TODO: Create a directory named with the ID and copy the file to that directory.
        });
    }
}
