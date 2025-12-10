const REGEXP = {
    NUMBER: /^[0-9]$/,
    OPERATOR: /^[+\-*/xX]$/,
    ACTION: /^(backspace|enter|delete|=)$/i,
    EQUAL: /^(enter|=)$/i,
};

const KEY_SCHEMA = new Map([
    [REGEXP.NUMBER, (key) => ({ type: "number", value: Number(key) })],
    [REGEXP.OPERATOR, (key) => ({ type: "operator", value: key.toLowerCase() === "x" ? "*" : key })],
    [REGEXP.ACTION, (key) => ({ type: "action", value: REGEXP.EQUAL.test(key) ? "equal" : key.toLowerCase() })],
]);

class KeyValidator {
    constructor(schema = KEY_SCHEMA) {
        this.schema = schema;
    }

    #extractKey(event) {
        const keyValue = {
            click: event.target.value,
            keydown: event.key,
        };
        return keyValue[event.type] || null;
    }

    validate(event) {
        const key = this.#extractKey(event);
        if (!key) return null;
        if (key === "Enter") event.preventDefault();

        for (const [pattern, transformer] of this.schema) {
            if (pattern.test(key)) {
                try {
                    return transformer(key);
                } catch (error) {
                    console.error(`Erro ao transformar chave "${key}":`, error);
                    return null;
                }
            }
        }
        return null;
    }
}
export default KeyValidator;
