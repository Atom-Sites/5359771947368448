import { headers } from 'next/headers';

export async function metadata(page_name) {
        const headersList = headers();
        
        // read the custom x-url header
        const header_url = headersList.get('x-url') || "";   
        const url = new URL(header_url);
        
        const data = await fetch(`${url.origin}/api/staticdata?filename=page.json&pagename=${page_name}`).then((res) => res.json())
        
        return {
            title: data.pageTitle,
            description: data.description,
            openGraph: {
                title: data.title,
                description: data.description,
                image: data.imageUrl
            },
        }
  }
   