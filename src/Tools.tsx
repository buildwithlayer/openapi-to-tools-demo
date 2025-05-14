import './Tools.css';
import type {APITool} from '@buildwithlayer/openapi-to-tools/dist/types';

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