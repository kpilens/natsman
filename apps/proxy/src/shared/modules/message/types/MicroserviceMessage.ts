export interface MicroserviceMessage<T = any, K = any> {
    data: T,
    metadata?: K
}

interface IPattern {
    cmd: string
    [x: string]: string
}

export interface RequestMessage<T = IPattern, K = MicroserviceMessage> {
    pattern: T,
    payload?: K
}