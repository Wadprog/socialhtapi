import { renderTemplate } from './renderTemplate'; // Adjust the import path as needed

describe('renderTemplate', () => {
    it('should replace placeholders with corresponding values from the data object', () => {
        const template = "Hello, {name}! Your order {orderId} is ready.";
        const data = { name: "Alice", orderId: 12345 };
        const result = renderTemplate(template, data);
        expect(result).toBe("Hello, Alice! Your order 12345 is ready.");
    });

    it('should leave placeholders unchanged if the key is missing in the data object', () => {
        const template = "Hi {name}, your order {orderId} is ready!";
        const data = { name: "Bob" };
        const result = renderTemplate(template, data);
        expect(result).toBe("Hi Bob, your order {orderId} is ready!");
    });

    it('should handle templates with no placeholders', () => {
        const template = "Welcome to the system.";
        const data = { name: "Alice" };
        const result = renderTemplate(template, data);
        expect(result).toBe("Welcome to the system.");
    });

    it('should handle empty templates', () => {
        const template = "";
        const data = { name: "Alice" };
        const result = renderTemplate(template, data);
        expect(result).toBe("");
    });

    it('should handle empty data object', () => {
        const template = "Hello, {name}!";
        const data = {};
        const result = renderTemplate(template, data);
        expect(result).toBe("Hello, {name}!");
    });

    it('should replace multiple instances of the same placeholder', () => {
        const template = "{name} likes {name}'s own posts.";
        const data = { name: "Alice" };
        const result = renderTemplate(template, data);
        expect(result).toBe("Alice likes Alice's own posts.");
    });

    it('should handle special characters in values', () => {
        const template = "Hello, {name}!";
        const data = { name: "<Alice>" };
        const result = renderTemplate(template, data);
        expect(result).toBe("Hello, <Alice>!");
    });

    it('should convert non-string values to strings', () => {
        const template = "Order ID: {orderId}";
        const data = { orderId: 12345 };
        const result = renderTemplate(template, data);
        expect(result).toBe("Order ID: 12345");
    });
});
