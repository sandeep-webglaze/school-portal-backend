export interface ITemplate {
    subject: string;
    html?: string;
    text?: string;
}
export interface IMail {
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    text?: string;
    html?: string;
    attachments?: any[];
}
