import './Tools.css';
import type {APITool} from '@buildwithlayer/openapi-to-tools/types.js';

interface IToolsProps {
    tools: APITool[];
}

function Tools({tools}: IToolsProps) {
    return (
        <pre>
            {JSON.stringify(tools, null, 2)}
        </pre>
    );
}

export default Tools;