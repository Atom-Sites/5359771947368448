
import path from 'path';
import { promises as fs } from 'fs';

import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('pagename');
    const filename = searchParams.get('filename');

    // log the files available in current directory

    // Find the absolute path of the json directory
    const filepathSubdir = page ? path.join(page, filename) : filename;
    const filePath = path.join(`${process.cwd()}`, "public", "static", "json", filepathSubdir);
    
    try {
        // Read the file contents and return them as JSON
        const fileContents = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContents);
        return NextResponse.json(jsonData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If the file doesn't exist, return a 404 error
            return NextResponse.json({ message: `File ${filePath} not found` }, { status: 404 });
        } else if (error instanceof SyntaxError) {
            // If there's a JSON parsing problem, return a 400 error
            return NextResponse.json({ message: `Error parsing ${filename}.json: ${error.message}` }, { status: 400 });
        } else {
            // For other errors, return a 500 error
            return NextResponse.json({ message: `An unexpected error occurred: ${error.message}` }, { status: 500 });
        }
    }
}
