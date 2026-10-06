import { useCallback, useState } from "react";
import { api } from "../api";

type ContentType = "twitter" | "youtube";

interface Content {
    title: string;
    link: string;
    type: ContentType;
}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);

    const refresh = useCallback(async () => {
        const response = await api.get<{ content: Content[] }>("/content");
        setContents(response.data.content);
    }, []);

    return { contents, refresh };
}
