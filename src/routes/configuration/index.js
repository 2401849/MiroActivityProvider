import path from 'path'
import { fileURLToPath } from 'url';

function parameters(req, res) {
    res.send([
            {"name": "name", "type": "text/plain"},
            {"name": "instructions", "type": "text/plain"},
            {"name": "boardid", "type": "text/plain"},
    ])
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function _interface(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'configuration.html'))
};

export const config = {
    parameters,
    interface: _interface
}