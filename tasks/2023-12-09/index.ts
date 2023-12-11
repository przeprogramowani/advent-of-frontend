export interface Tool {
    init: () => void;
    update: () => void;
    dispose: () => void; 
}

export class Equipment {
    #tools = new Map<Tool, boolean>([]);

    public registerTools(tool: Tool) {
        this.#tools.set(tool, false);
    }

    public initializeTools() {
        for (const [tool] of this.#tools.entries()) {
            tool.init();
            this.#tools.set(tool, true);
        }
    }

    public updateTools() {
        for (const [tool, initialized] of this.#tools.entries()) {
            if (!initialized) {
                throw new Error('Cannot update any tools before initialization.');
            }

            tool.update();
        }
    }

    public disposeTools() {
        for (const [tool] of this.#tools.entries()) {
            tool.dispose();

            this.#tools.set(tool, false);
        }
    }
}
