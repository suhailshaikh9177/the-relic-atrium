import { useState, useEffect } from 'react';
import { ARTIFACTS_DATA } from '../data/artifactsData';
import { WINGS } from '../data/wingsData';
import { INVENTORS } from '../data/inventors';

export const useAssetPreloader = (): { progress: number; isLoaded: boolean } => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Collect all assets
        const assetsToLoad: string[] = [];

        // 1. Artifact Images
        ARTIFACTS_DATA.forEach(a => {
            if (a.image) assetsToLoad.push(a.image);
            if (a.inventorPortrait) assetsToLoad.push(a.inventorPortrait);
            if (a.inventors) {
                a.inventors.forEach(inv => {
                    if (inv.portrait) assetsToLoad.push(inv.portrait);
                });
            }
        });

        // 2. Wing Images & Videos
        WINGS.forEach(w => {
            if (w.image) assetsToLoad.push(w.image);
            // Assuming video paths based on wing ID
            assetsToLoad.push(`/videos/${w.id}.mp4`);
        });

        // 3. Inventor Portraits (Hero Page)
        INVENTORS.forEach(inv => {
            if (inv.image) assetsToLoad.push(inv.image);
        });

        // Backgrounds & Globals
        assetsToLoad.push('/images/bg-sunrise.webp');
        assetsToLoad.push('/images/dark-grid.png');

        // Deduplicate
        const uniqueAssets = Array.from(new Set(assetsToLoad));
        const totalAssets = uniqueAssets.length;
        let loadedCount = 0;

        if (totalAssets === 0) {
            setProgress(100);
            setIsLoaded(true);
            return;
        }

        const handleLoad = () => {
            loadedCount++;
            const currentProgress = Math.round((loadedCount / totalAssets) * 100);
            setProgress(currentProgress);

            if (loadedCount === totalAssets) {
                // Slight delay at 100% to ensure JS parses heavy assets
                setTimeout(() => setIsLoaded(true), 300);
            }
        };

        const handleError = (asset: string) => {
            console.warn(`Asset failed to preload (ignoring for progress):`, asset);
            handleLoad(); // still increment to not block the loader forever
        };

        uniqueAssets.forEach(src => {
            if (src.endsWith('.mp4')) {
                const video = document.createElement('video');
                video.preload = 'auto';
                video.oncanplaythrough = handleLoad;
                video.onerror = () => handleError(src);
                video.src = src;
                video.load(); // Kick off network request
            } else {
                const img = new Image();
                img.onload = handleLoad;
                img.onerror = () => handleError(src);
                img.src = src;
            }
        });
    }, []);

    return { progress, isLoaded };
};
