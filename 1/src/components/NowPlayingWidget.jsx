import React, { useState, useEffect , useCallback } from 'react';
import clsx from 'clsx';
// --- Configuration ---
// IMPORTANT: Please update these with your actual Last.fm API Key and Username.
// Note: Read-only keys are public, but for true security, a backend proxy is recommended.
const LASTFM_API_KEY = "05d6dee910cae11df72b6ed3afa56b50";
const LASTFM_USERNAME = "OsakaLOOP";
const API_BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const VOCADB_BASE_URL = 'https://vocadb.net/api/'; // VocaDB API Endpoint
const REFRESH_INTERVAL_MS = 15000; // Poll every 15 seconds for timely updates

// Using a path relative to the Docusaurus static folder (e.g., /static/img)
const FALLBACK_IMAGE_URL = '/img/album-fallback.png';



const cleanName = (name) => {
    if (!name) return name;

    let cleaned = name;

    // 1. Remove content starting from "feat." or "ft." (case-insensitive)
    // The pattern removes " feat." or " ft." and everything that follows.
    cleaned = cleaned.replace(/\s*(feat\.|ft\.).*$/i, '');

    // 2. Remove content starting from a forward slash (/)
    // The pattern removes "/" and everything that follows, including leading whitespace.
    cleaned = cleaned.replace(/\s*\/(.*)/, '');

    // 3. Remove content in parentheses or square brackets (the original logic)
    // Regex to find and remove: [stuff] or (stuff) including surrounding whitespace
    cleaned = cleaned.replace(/\s*[\(\[].*?[\)\]]/g, '');

    return cleaned.trim();
};

/**
 * Fetches data once without retries.
 * @param {string} url - The API endpoint URL.
 * @returns {Promise<object>} The parsed JSON response.
 */
const fetchWithRetry = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Last.fm returns 200 even on some API errors, so this primarily catches HTTP errors.
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        const apiName = url.includes(VOCADB_BASE_URL) ? 'VocaDB' : (url.includes('itunes.apple.com') ? 'iTunes' : 'Last.fm');
        // Log the failure and re-throw the error immediately since we are not retrying.
        console.error(`Failed to fetch data from ${apiName}:`, error.message);
        throw new Error(`Failed to fetch data from ${apiName}.`);
    }
};

/**
 * Calculates the time difference between a past timestamp and now (up to 1 hour).
 * @param {number} timestampMs - Past timestamp in milliseconds.
 * @returns {string} Human-readable time ago string.
 */
const getRelativeTime = (timestampMs) => {
    const now = Date.now();
    const diff = now - timestampMs; // Difference in milliseconds

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    // Since the API now filters out anything older than 1 hour, this is mostly a fallback.
    if (hours > 0) {
        return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    }
    if (minutes >= 1) {
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    }
    return `just now`;
};


/**
 * Searches the iTunes API for album art and duration.
 * @param {string} artist
 * @param {string} trackName
 * @returns {Promise<{imageUrl: string|null, durationMs: number|null}>} Image URL and track duration (in ms).
 */
const searchiTunesForAlbumArt = async (artist, trackName) => {
    const query = `${artist} ${trackName}`;
    // Search for limit=1, entity=song
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;

    try {
        const data = await fetchWithRetry(url);

        if (data.resultCount > 0 && data.results[0].artworkUrl100) {
            const result = data.results[0];
            let imageUrl = result.artworkUrl100.replace('100x100bb', '600x600bb');
            const durationMs = result.trackTimeMillis || null;
            return { imageUrl, durationMs };
        }
    } catch (e) {
        console.error("Secondary iTunes lookup failed:", e.message);
    }
    return { imageUrl: null, durationMs: null };
};

/**
 * Searches VocaDB for the Artist/Producer ID using an Exact match mode.
 * @param {string} artist Last.fm artist (usually the producer).
 * @returns {Promise<number|null>} VocaDB Artist ID.
 */
const getVocaDBArtistId = async (artist) => {
    // VocaDB API for artist search: Assumed endpoint is /api/artists
    // Use Exact match mode for the artist to ensure we get the right producer.
    // Setting maxResults=1 and fields=None for efficiency.
    const url = `${VOCADB_BASE_URL}artists?query=${encodeURIComponent(artist)}&nameMatchMode=Exact&maxResults=1`;

    try {
        const data = await fetchWithRetry(url);

        if (data.items && data.items.length > 0) {
            // Return the ID of the first (and hopefully exact) match
            return data.items[0].id;
        }
    } catch (e) {
        console.warn("VocaDB Artist ID lookup failed. Proceeding to song search.", e.message);
    }
    return null;
};


/**
 * Searches VocaDB for detailed artist/vocaloid information.
 * @param {string} artist Last.fm artist (usually the producer).
 * @param {string} trackName Track name.
 * @param {number|null} artistId Optional VocaDB Artist ID for targeted search.
 * @returns {Promise<string|null>} Detailed artist string (e.g., "Producer feat. Vocaloid" - potentially in Japanese)
 */
const searchVocaDBForVocaloidInfo = async (artist, trackName, artistId) => {
    let url;

    // Step 2: Use the ID if found, otherwise fall back to a combined query
    if (artistId) {
        // Targeted search using the confirmed VocaDB Artist ID
        url = `${VOCADB_BASE_URL}songs?query=${encodeURIComponent(trackName)}&artistId[]=${artistId}&fields=Artists&maxResults=1&nameMatchMode=Auto&lang=Japanese`;
    } else {
        // Fallback: Combined track name and producer for a less precise search
        const query = `${trackName} ${artist}`;
        url = `${VOCADB_BASE_URL}songs?query=${encodeURIComponent(query)}&fields=Artists&maxResults=1&nameMatchMode=Auto&lang=Japanese`;
    }

    try {
        const data = await fetchWithRetry(url);

        if (data.items && data.items.length > 0) {
            const result = data.items[0];
            // VocaDB provides a formatted string like "Producer feat. Hatsune Miku"
            if (result.artistString) {
                // Log the successfully found artist string
                console.log('VocaDB Search Success: Found artistString:', result.artistString);
                return result.artistString;
            } else {
                // Log when an item is found but the required field is missing
                console.log('VocaDB Search Failed (1/2): Item found but missing artistString (ID:', result.id, ')');
            }
        } else {
             // Log when no items are returned
             console.log('VocaDB Search Failed (2/2): No items found for query:', trackName, 'by', artist);
        }
    } catch (e) {
        // Only log warnings for VocaDB lookup failure, as it's non-critical
        console.warn("VocaDB song lookup failed or returned no match. Falling back to Last.fm artist.", e.message);
    }
    return null;
};

// Define size configurations for responsive scaling
const sizeMap = {
    micro: { // NEW SIZE: Album Art Only (24x24 image)
        width: 'max-w-min',
        image: 'h-6 w-6', // 24px x 24px
        padd: 'p-0',
        textLg: 'hidden', // Hide all text
        textSm: 'hidden',
        textXs: 'hidden',
        icon: 'hidden', // Hide link icon
        minimal: true, // Flag to hide status indicator and text container
    },
    xsmall: {
        width: 'max-w-xs',
        image: 'h-6 w-6', // 24px x 24px
        padd: 'p-1.5',
        textLg: 'text-xs', // Track name
        textSm: 'text-[10px]', // Artist
        textXs: 'text-[9px]', // Status (Extra tiny)
        icon: 'h-3 w-3', // Smaller link icon
        minimal: false,
    },
    small: {
        width: 'max-w-xs', // 320px
        image: 'h-8 w-8',
        padd: 'p-2',
        textLg: 'text-sm', // Track name
        textSm: 'text-xs', // Artist
        textXs: 'text-xs', // Status
        icon: 'h-4 w-4',
        minimal: false,
    },
    medium: { // Default size
        width: 'max-w-sm', // 384px
        image: 'h-10 w-10',
        padd: 'p-3',
        textLg: 'text-base', // Track name
        textSm: 'text-sm', // Artist
        textXs: 'text-xs', // Status
        icon: 'h-4 w-4',
        minimal: false,
    },
    large: {
        width: 'max-w-md', // 448px
        image: 'h-12 w-12',
        padd: 'p-4',
        textLg: 'text-lg', // Track name
        textSm: 'text-base', // Artist
        textXs: 'text-sm', // Status
        icon: 'h-5 w-5',
        minimal: false,
    },
};

const NowPlayingWidget = ({ size = 'medium' }) => {
    const [track, setTrack] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playbackPercentage, setPlaybackPercentage] = useState(0); // State for progress bar

    const currentSize = sizeMap[size] || sizeMap.medium;
    const isMinimal = currentSize.minimal;

    // Wrap fetchNowPlaying in useCallback since it's used in the polling effect and the timer effect
    const fetchNowPlaying = useCallback(async () => {
        if (!LASTFM_API_KEY || LASTFM_API_KEY === "YOUR_API_KEY" || !LASTFM_USERNAME || LASTFM_USERNAME === "YOUR_LASTFM_USERNAME") {
            setError("Please configure your LASTFM_API_KEY and LASTFM_USERNAME.");
            setIsLoading(false);
            return;
        }

        // Calculate UNIX timestamp for 1 hour ago (in seconds)
        const oneHourAgoUTS = Math.floor((Date.now() - 3600000) / 1000);

        // We use limit=1 to get the most recent track, and 'to' to filter anything older than 1 hour.
        const url = `${API_BASE_URL}?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&limit=1&format=json&to=${oneHourAgoUTS}`;

        // Log API fetch attempt (15s interval check)
        console.log(`[${new Date().toLocaleTimeString()}] Fetching Last.fm data...`);

        try {
            const data = await fetchWithRetry(url);

            if (data.error) {
                throw new Error(`Last.fm API Error: ${data.message}`);
            }

            const recentTracks = data?.recenttracks?.track;

            if (recentTracks && recentTracks.length > 0) {
                const latestTrack = recentTracks[0];
                const isPlaying = latestTrack['@attr']?.nowplaying === 'true';

                // Store raw names for change detection
                const rawTrackName = latestTrack.name;
                const rawProducerName = latestTrack.artist['#text'];

                // Cleaned names for display and lookups
                const cleanedTrackName = cleanName(rawTrackName);
                const cleanedProducerName = cleanName(rawProducerName);

                // Last.fm gives timestamp in seconds (UTS). Convert to milliseconds for client-side use.
                // This is the value we prioritize for the start time if the track is playing.
                const trackTimestampMs = latestTrack.date?.uts ? parseInt(latestTrack.date.uts, 10) * 1000 : null;

                let timeAgo = null;

                // --- Relative Time Logic ---
                if (!isPlaying && trackTimestampMs) {
                    timeAgo = getRelativeTime(trackTimestampMs);
                }


                // --- Image and Duration Fetching Logic ---
                let finalImageUrl = latestTrack.image[1]?.['#text'] || null;
                let durationMs = null;

                // Lookup iTunes for better art/duration if playing or if art is generic/missing
                if (!finalImageUrl || finalImageUrl.includes('2a96cbd8b46e442fc41c2b86b821562f') || finalImageUrl.includes('default_album') || isPlaying) {
                    const itunesResult = await searchiTunesForAlbumArt(
                        cleanedProducerName,
                        cleanedTrackName
                    );
                    if (itunesResult.imageUrl) finalImageUrl = itunesResult.imageUrl;
                    durationMs = itunesResult.durationMs;
                }

                // --- VocaDB Lookup for Vocaloid Info (Two-Step Process) ---
                let vocaloidArtistString = null;

                // 1. Try to find the VocaDB Artist ID for the producer
                const vocaDBArtistId = await getVocaDBArtistId(cleanedProducerName);
                // Log the result of the VocaDB ID lookup
                console.log('VocaDB Artist ID Lookup:', vocaDBArtistId ? `Found ID ${vocaDBArtistId}` : 'ID not found');

                // 2. Use the ID (if found) for a targeted song search
                vocaloidArtistString = await searchVocaDBForVocaloidInfo(
                    cleanedProducerName,
                    cleanedTrackName,
                    vocaDBArtistId
                );

                // 3. Clean the VocaDB result before storing
                if (vocaloidArtistString) {
                    // Apply a slightly less aggressive clean to the VocaDB result
                    // since it's already a formatted string, just removing brackets/parentheses
                    // Note: We use the simpler original regex here to preserve "feat." from VocaDB
                    vocaloidArtistString = vocaloidArtistString.replace(/\s*[\(\[].*?[\)\]]/g, '').trim();
                }


                // Determine if the track has changed since the last poll (compare raw values)
                const hasTrackChanged = track?.rawName !== rawTrackName || track?.rawArtist !== rawProducerName;

                let playbackStartTimeMs = track?.playbackStartTimeMs;

                // --- PROGRESS BAR START TIME LOGIC REFINED ---
                if (isPlaying) {
                    if (trackTimestampMs) {
                        // 1. MOST ACCURATE: Use the UTS provided by the server as the start time.
                        playbackStartTimeMs = trackTimestampMs;

                        // If the server timestamp is used and it's a new track or we didn't have a start time before, reset the progress.
                        if (hasTrackChanged || !track?.playbackStartTimeMs) {
                            setPlaybackPercentage(0);
                        }
                    } else if (hasTrackChanged || !playbackStartTimeMs) {
                        // 2. FALLBACK: If no server timestamp, and it's a new track/init, estimate now.
                        playbackStartTimeMs = Date.now();
                        setPlaybackPercentage(0);
                    }
                    // 3. CONTINUITY: Otherwise, if the track is the same and playing, keep the existing client-side estimate (if any).
                } else {
                    // Not playing, clear the start time.
                    playbackStartTimeMs = null;
                }

                // --- END OF PROGRESS BAR START TIME LOGIC ---

                const trackData = {
                    name: cleanedTrackName, // Display cleaned name
                    artist: cleanedProducerName, // Display cleaned name
                    rawName: rawTrackName, // Raw name for change detection
                    rawArtist: rawProducerName, // Raw artist for change detection
                    vocaloidArtist: vocaloidArtistString, // Detailed VocaDB artist string
                    album: latestTrack.album['#text'],
                    image: finalImageUrl || FALLBACK_IMAGE_URL,
                    url: latestTrack.url,
                    isPlaying: isPlaying,
                    timeAgo: timeAgo,
                    durationMs: durationMs, // Total track duration (from iTunes)
                    playbackStartTimeMs: playbackStartTimeMs, // Start time (server UTS or client-side estimate)
                };

                // REMOVED VERBOSE LOG: console.log('Now Playing Track Data:', trackData);

                setTrack(trackData);
            } else {
                // If recentTracks is empty, it means user is not playing AND hasn't scrobbled in 1 hour.
                setTrack(null);
            }
            setError(null);
        } catch (err) {
            // Check for explicit error messages thrown by fetchWithRetry or Last.fm
            const errorMessage = err.message.includes('API Key') ? 'Invalid API Key or Username.' : 'Failed to retrieve track status.';
            console.error("Fetch error:", err.message);
            setError(errorMessage);
            setTrack(null);
        } finally {
            setIsLoading(false);
        }
    }, [track]); // Dependency on 'track' to check for track change

    // Polling setup for timely updates
    useEffect(() => {
        fetchNowPlaying();
        const intervalId = setInterval(fetchNowPlaying, REFRESH_INTERVAL_MS);
        return () => clearInterval(intervalId);
    }, [fetchNowPlaying]);

    // --- Playback Timer Effect for Progress Bar ---
    useEffect(() => {
        // Only run timer if we have a playing track with a known duration and start time
        if (!track || !track.isPlaying || !track.durationMs || !track.playbackStartTimeMs) {
            // Log when the timer is stopped or not started
            // console.log(`[${new Date().toLocaleTimeString()}] Progress Timer Stopped.`);
            setPlaybackPercentage(0);
            return;
        }

        // Log when the timer is started/restarted
        // console.log(`[${new Date().toLocaleTimeString()}] Progress Timer Running (0.5s interval).`);

        const timer = setInterval(() => {
            const elapsed = Date.now() - track.playbackStartTimeMs;
            let percentage = Math.min((elapsed / track.durationMs) * 100, 100);

            // This is the source of the rapid re-renders (every 500ms)
            setPlaybackPercentage(percentage);

            // If progress reaches 100%, stop the timer and force a re-fetch to get the next track status
            if (percentage >= 100) {
                clearInterval(timer);
                fetchNowPlaying();
            }
        }, 500); // Update every half second for a smoother progress bar

        // Cleanup function to clear the interval
        return () => clearInterval(timer);
    }, [track, fetchNowPlaying]); // Re-run effect when the track object changes

    // Base widget classes (conditionally remove border/shadow for micro size)
    const baseClasses = clsx(
        "bg-white font-inter widget-container", // Added custom class for CSS targeting
        currentSize.width,
        {
            // Remove border/shadow if it has a progress bar, as the bar itself acts as the bottom
            'rounded-lg shadow-2xl overflow-hidden border border-gray-200': !isMinimal && (!track?.isPlaying || !track?.durationMs),
            'rounded-lg shadow-2xl overflow-hidden': !isMinimal && track?.isPlaying && track?.durationMs,
            'inline-block': isMinimal
        }
    );

    // --- Loading State, Error State, No Track State (unchanged) ---
    if (isLoading) {
        if (isMinimal) return null;
        return (
            <div className={clsx("bg-gray-100 rounded-lg shadow-2xl flex items-center space-x-2 font-inter text-gray-700", currentSize.padd, currentSize.width)}>
                <svg className="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className={currentSize.textSm}>Loading...</p>
            </div>
        );
    }

    if (error) {
        if (isMinimal) return null;
        return (
            <div className={clsx("bg-red-100 border border-red-400 rounded-lg shadow-2xl text-red-700", currentSize.padd, currentSize.width)}>
                <p className={clsx("font-bold", currentSize.textSm)}>Last.fm Error:</p>
                <p className={clsx("mt-0.5", currentSize.textXs)}>{error}</p>
            </div>
        );
    }

    if (!track) {
        if (isMinimal) return null;
        return (
            <div className={clsx("bg-white rounded-lg shadow-2xl text-gray-500 font-inter", currentSize.padd, currentSize.textSm, currentSize.width)}>
                Not listening right now.
            </div>
        );
    }

    // --- Now Playing / Recently Played Display ---
    const { name, artist, vocaloidArtist, image, url, isPlaying, timeAgo, durationMs } = track;

    // Use the VocaDB string if it exists (now Japanese-first), otherwise fall back to the Last.fm artist (producer)
    const displayArtist = vocaloidArtist || artist;

    // Determine status text and colors based on 'isPlaying' or 'timeAgo'
    const statusText = isPlaying ? "NOW PLAYING" : (timeAgo ? timeAgo.toUpperCase() : "LAST PLAYED");
    const statusBg = isPlaying ? "bg-green-500" : (timeAgo ? "bg-amber-500" : "bg-indigo-500");
    const statusTextColor = isPlaying ? "text-green-500" : (timeAgo ? "text-amber-500" : "text-indigo-500");
    const animationClass = isPlaying ? 'animate-pulse' : '';

    const hasProgressBar = isPlaying && durationMs && !isMinimal;

    return (
        <div className={baseClasses}>

            {/* Status Indicator (Hidden in micro size) */}
            {!isMinimal && (
                <div className={clsx("flex items-center space-x-1.5", currentSize.padd)}>
                    {/* Only show the pulsating dot if currently playing */}
                    {isPlaying && <div className={`h-2 w-2 rounded-full ${statusBg} ${animationClass}`}></div>}

                    <span className={clsx("font-semibold tracking-wider", currentSize.textXs, statusTextColor)}>
                        {statusText}
                    </span>
                </div>
            )}

            {/* Track Details Card (Main Content) */}
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                // ADDED: w-full ensures the link block respects the size of the parent container
                // Uses custom class 'now-playing-link' for high-specificity CSS targeting
                className={clsx("w-full flex items-center space-x-2 transition duration-200 group now-playing-link", currentSize.padd, {
                    'hover:bg-gray-50 border-t border-gray-100': !isMinimal && !hasProgressBar,
                    'hover:bg-gray-50': !isMinimal && hasProgressBar,
                })}
            >
                {/* Album Art (Image) */}
                <div className="flex-shrink-0 relative rounded-md overflow-hidden shadow-md">
                    <img
                        src={image}
                        alt={`${name} by ${displayArtist}`}
                        className={clsx("object-cover rounded-md", currentSize.image)}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FALLBACK_IMAGE_URL;
                        }}
                    />
                </div>

                {/* Text Information (Hidden in micro size) */}
                {!isMinimal && (
                    <div className="min-w-0 flex-1">
                        <p
                            // Relying on external CSS for color/size override
                            className={clsx("font-bold truncate text-gray-800 transition-colors duration-150 group-hover:text-indigo-600", currentSize.textLg)}
                            title={name}
                        >
                            {name}
                        </p>
                        <p
                            // Relying on external CSS for color/size override
                            className={clsx("text-gray-500 truncate mt-0.5", currentSize.textSm)}
                            title={displayArtist}
                        >
                            {displayArtist}
                        </p>
                    </div>
                )}


                {/* Link Icon (Hidden in micro size) */}
                {!isMinimal && (
                    <div className="flex-shrink-0 text-gray-400 opacity-50 transition-opacity duration-200 group-hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={currentSize.icon}>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </div>
                )}
            </a>

            {/* Playback Progress Bar (NEW) */}
            {hasProgressBar && (
                // Uses custom class 'now-playing-progress-bar-container' for high-specificity CSS targeting
                <div className="h-1 bg-gray-200 w-full relative now-playing-progress-bar-container">
                    <div
                        className="h-full bg-indigo-500 transition-all duration-500 ease-linear"
                        style={{ width: `${playbackPercentage}%` }}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default NowPlayingWidget;
