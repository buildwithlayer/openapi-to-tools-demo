import './App.css';
import {parseToolsFromSpec} from '@buildwithlayer/openapi-to-tools/index.js';
import {type APITool} from '@buildwithlayer/openapi-to-tools/types.js';
import {OpenAPI} from '@buildwithlayer/openapi-zod-spec/3/1/1/open-api.js';
import {useEffect, useState} from 'react';
import FileUpload from './FileUpload.tsx';
import Tools from './Tools.tsx';

function App() {
    const [spec, setSpec] = useState<OpenAPI | null>(null);
    const [tools, setTools] = useState<APITool[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (spec === null || loading) return;

        setLoading(true);
        try {
            setTools(parseToolsFromSpec(spec));
        } catch (e) {
            console.error(e);
            setError(`Failed to parse tools from spec: ${e}`);
        } finally {
            setLoading(false);
        }
    }, [loading, spec]);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <FileUpload submit={(s) => setSpec(s)}/>
            {error && <h3 id={'error'}>{error}</h3>}
            {tools.length > 0 && <Tools tools={tools}/>}
        </>
    );
}

export default App;
