import { useCallback, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

type ContentType = "twitter" | "youtube";

interface Content {
    title: string;
    link: string;
    type: ContentType;
}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);

    const refresh = useCallback(async () => {
        const response = await axios.get<{ content: Content[] }>(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                Authorization: localStorage.getItem("token") || ""
            }
        });
        setContents(response.data.content);
    }, []);

    return { contents, refresh };
}