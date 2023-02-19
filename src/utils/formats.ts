export function unwrapQuery(val: string | (string | null)[]): string {
    if (val == null) return ""

    return val as string
}

export function cutString(val: string, len: number): string {
    if (val.length >= len) return val.substring(0, len) + "..."
    return val
}