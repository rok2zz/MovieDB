export function unwrapQuery(val: string | (string | null)[]): string {
    if (val == null) return ""

    return val as string
}