export interface ClientToServerEvents {
    sendMessage: () => void;
}

export interface ServerToClientEvents {
    recieveMessage: () => void;
}


