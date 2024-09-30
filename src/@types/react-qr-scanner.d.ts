declare module 'react-qr-scanner' {
    import { Component } from 'react';

    interface QrScannerProps {
        onError: (error: any) => void;
        onScan: (data: string | null) => void;
        style?: React.CSSProperties;
        facingMode?: string; // 'environment' or 'user'
        delay?: number; // delay in ms
    }

    export default class QrScanner extends Component<QrScannerProps> {}
}
