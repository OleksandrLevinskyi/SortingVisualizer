export function pause(ms: number) {
    return new Promise<number>((resolve: any) => setTimeout(resolve, ms));
}