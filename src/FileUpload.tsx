import type {OpenAPI} from '@buildwithlayer/openapi-zod-spec/3/1/1/open-api.js';
import {OpenAPISpec, upgrade} from '@buildwithlayer/openapi-zod-spec/index.js';
import {type ChangeEvent, useState} from 'react';
import {parse} from 'yaml';

interface IFileUploadProps {
    submit: (spec: OpenAPI) => void;
}

function FileUpload({submit}: IFileUploadProps) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const file = e.target.files?.[0];

        if (file === undefined) {
            setLoading(false);
            setError('No file selected');
            return;
        }

        const isJson = file.type === 'application/json' || file.name.endsWith('.json');
        const isYaml = file.type === 'application/yaml' || file.name.endsWith('.yaml') || file.name.endsWith('.yml');

        if (!isJson && !isYaml) {
            setLoading(false);
            setError('Invalid file type. Please select a JSON or YAML file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let specContent: any;
            try {
                specContent = isJson ? JSON.parse(content) : parse(content);
            } catch (e) {
                console.error(e);
                setLoading(false);
                setError(`Failed to parse file: ${e}`);
                return;
            }

            let spec: OpenAPISpec;
            try {
                spec = OpenAPISpec.parse(specContent);
            } catch (e) {
                console.error(e);
                setLoading(false);
                setError(`Failed to parse OpenAPI spec: ${e}`);
                return;
            }

            try {
                submit(upgrade(spec));
            } catch (e) {
                console.error(e);
                setError(`Failed to upgrade spec: ${e}`);
            } finally {
                setLoading(false);
            }
        };
        reader.readAsText(file);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange}/>
            {error && <h3 id={'error'}>{error}</h3>}
        </div>
    );
}

export default FileUpload;