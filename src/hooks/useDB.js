import { useState, useEffect } from 'react';
import DB from '../utils/db';

export function useDB(key, initialValue = null) {
    const [data, setData] = useState(initialValue || DB.defaults[key] || []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const result = await DB.get(key);
                if (isMounted) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                console.error(`Error loading data for ${key}:`, err);
                if (isMounted) setLoading(false);
            }
        };

        fetchData();
        return () => { isMounted = false; };
    }, [key]);

    return [data, loading, setData];
}
