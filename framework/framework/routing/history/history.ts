module plat.routing {
    export class History {
        entries: Array<IHistoryEntry> = [];

        get length() {
            return this.entries.length;
        }

        push(entry: IHistoryEntry) {
            return this.entries.push(entry);
        }

        pop() {
            return this.entries.pop();
        }

        slice(index: number) {
            this.entries = this.entries.slice(0, index + 1);

            return this.entries[index];
        }

        indexOf(view: string): number {
            var entries = this.entries;

            for (var i = entries.length - 1; i >= 0; --i) {
                if (entries[i].view === view) {
                    return i;
                }
            }

            return -1;
        }

        forEach(handler: (entry: IHistoryEntry, index: number, entries: Array<IHistoryEntry>) => void): void {
            forEach(handler, this.entries);
        }
    }

    export interface IHistoryEntry {
        url: string;
        view: string;
        parameters: IObject<string>;
        query: IObject<string>;
    }

    export function IHistory() {
        return new History();
    }

    register.injectable(__History, IHistory);
}
