import { create } from 'zustand';
import { CanvasSupportState } from './canvasStore.types';

export const useCanvasSupportStore = create<CanvasSupportState>((set) => ({
    canvasSupported: null,
    textApiSupported: null,
    toDataUrlSupported: null,
    canvasSignature: null,
    canvasDataUrl: null,
    canvasSizeInBytes: null,
    numberOfColors: null,
    checkSupport: async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const canvasSupported = !!ctx;
        const textApiSupported = !!ctx && typeof ctx.fillText === 'function' && typeof ctx.font === 'string' && typeof ctx.textBaseline === 'string';
        const toDataUrlSupported = typeof canvas.toDataURL === 'function';

        let canvasSignature = null;
        let canvasDataUrl = null;
        let canvasSizeInBytes = null;
        let numberOfColors = null;

        if (canvasSupported && textApiSupported && toDataUrlSupported && ctx) {
            canvas.width = 220;
            canvas.height = 30;

            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;

            ctx.fillStyle = 'orange';
            ctx.fillRect(129, 5, 58, 20);

            ctx.font = '14px Arial';
            ctx.fillStyle = 'turquoise';
            ctx.fillText('userleaks.charts.cx', 5, 20);

            ctx.fillStyle = 'green';
            ctx.fillText('  <canvas>', 120, 20);

            ctx.fillStyle = 'turquoise';
            ctx.fillText('1.0', 190, 20)

            canvasDataUrl = canvas.toDataURL();

            const base64string = canvasDataUrl.split(',')[1];
            const byteCharacters = atob(base64string);
            canvasSizeInBytes = byteCharacters.length;

            const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canvasDataUrl));
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            canvasSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            const colors = new Set();

            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const a = pixels[i + 3];
                const color = `rgba(${r},${g},${b},${a / 255})`;
                colors.add(color);
            }
            numberOfColors = colors.size;
        }

        set({
            canvasSupported,
            textApiSupported,
            toDataUrlSupported,
            canvasSignature,
            canvasDataUrl,
            canvasSizeInBytes,
            numberOfColors,
        });
    },
}));