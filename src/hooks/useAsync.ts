import { useCallback, useEffect, useState } from "react";

type status = "idle" | "pending" | "success" | "error";

//* Shoutout to https://usehooks.com/
export default function useAsync(asyncFunction: any, immediate: boolean) {

    const [ status, setStatus ] = useState<status>("idle");
    const [ value, setValue ] = useState(null);
    const [ error, setError ] = useState(null);

    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
        setStatus("pending");
        setValue(null);
        setError(null);

        return asyncFunction()
            .then((response: any) => {
                setValue(response);
                setStatus("success");
            })
            .catch((error: any) => {
                setError(error);
                setStatus("error");
            });
    }, [ asyncFunction ]);

    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [ execute, immediate ]);

    return { execute, status, value, error };
};