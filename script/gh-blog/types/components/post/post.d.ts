import { GistsGetResponseData } from '@octokit/types';
export declare class Post {
    readme: string;
    gist: GistsGetResponseData;
    gistId: string;
    componentWillLoad(): Promise<void>;
    renderPost(): any;
    render(): any;
}
