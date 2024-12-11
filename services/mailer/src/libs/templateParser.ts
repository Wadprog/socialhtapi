export function renderTemplate(template: string, data: Record<string, any>): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        if (data.hasOwnProperty(key)) {
            return String(data[key]);
        }
        // If the key is not found, return the placeholder as is
        return match;
    });
}