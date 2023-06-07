import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    const { filename, page } = req.query;
    // Find the absolute path of the json directory
    // const jsonDirectory = page ? path.join(process.cwd(), 'src/pages') : path.join(process.cwd(), 'src/components');
    const jsonDirectory = path.join(process.cwd(), 'src/components');

    // Construct the file path using the filename parameter
    const filePath = path.join(jsonDirectory, `${filename}`);

    try {
        // Read the file contents and return them as JSON
        const fileContents = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContents);
        res.status(200).json(jsonData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If the file doesn't exist, return a 404 error
            res.status(404).json({ message: `File ${filePath} not found` });
        } else if (error instanceof SyntaxError) {
            // If there's a JSON parsing problem, return a 400 error
            res.status(400).json({ message: `Error parsing ${filename}.json: ${error.message}` });
        } else {
            // For other errors, return a 500 error
            res.status(500).json({ message: `An unexpected error occurred: ${error.message}` });
        }
    }
}
