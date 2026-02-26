import { useState, useEffect } from 'react';
import { ARTIFACTS_DATA } from '../data/artifactsData';
import { WINGS } from '../data/wingsData';
import { INVENTORS } from '../data/inventors';

export const useAssetPreloader = (): { progress: number; isLoaded: boolean } => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Collect all assets systematically
        const assetsToLoad: string[] = [];

        // 1. Artifact Images & Enrichment Portraits
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
            // The video element paths
            assetsToLoad.push(`/videos/${w.id}.mp4`);
        });

        // 3. Main Landing Page Portraits (Hero Page)
        INVENTORS.forEach(inv => {
            if (inv.image) assetsToLoad.push(inv.image);
        });

        // 4. Backgrounds & Globals
        assetsToLoad.push('/images/bg-sunrise.webp');
        assetsToLoad.push('/images/dark-grid.png');

        // Deduplicate the list
        const uniqueAssets = Array.from(new Set(assetsToLoad)).filter(Boolean);
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
                // Ensure the DOM has a moment to settle after 100% calculation
                setTimeout(() => setIsLoaded(true), 500);
            }
        };

        const handleError = (asset: string) => {
            console.warn(`Asset failed to preload (ignoring for progress):`, asset);
            handleLoad(); // still increment to not block the loader forever
        };

        // Aggressive preloading strategy
        uniqueAssets.forEach(src => {
            if (src.endsWith('.mp4')) {
                const video = document.createElement('video');
                video.preload = 'auto'; // Force download
                video.oncanplaythrough = handleLoad;
                video.onerror = () => handleError(src);
                video.src = src;
                video.load();
            } else {
                const img = new Image();
                img.onload = () => {
                    // Try to decode the image into memory before marking as loaded
                    // This prevents the UI glitch where JS knows the image is there, 
                    // but the GPU hasn't painted it yet.
                    if ('decode' in img) {
                        img.decode()
                            .then(handleLoad)
                            .catch(() => handleLoad()); // fallback
                    } else {
                        handleLoad();
                    }
                };
                img.onerror = () => handleError(src);
                img.src = src;
            }
        });
    }, []);

    return { progress, isLoaded };
};
