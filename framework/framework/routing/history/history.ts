module plat.routing {
    export class History {
        entries: Array<IHistoryEntry> = [];

        get length() {
            return this.entries.length;
        }

        push(entry: IHistoryEntry) {
            this.entries.unshift(entry);
        }

        pop() {
            return this.entries.shift();
        }

        slice(index: number) {
            this.entries = this.entries.slice(index);

            return this.entries[index];
        }

        indexOf(view: string): number {
            var entries = this.entries,
                length = entries.length;

            for (var i = 0; i < length; ++i) {
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
