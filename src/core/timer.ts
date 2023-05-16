export class Timer {
    public millisecondsElapsed = 0

    protected current = 0
    protected previous = 0

    public hasPassed(milliseconds: number): boolean {
        this.update()
        return this.millisecondsElapsed >= milliseconds
    }

    public reset() {
        this.millisecondsElapsed = 0
    }

    protected update() {
        this.current = Date.now()

        if (this.previous) {
            this.millisecondsElapsed += this.current - this.previous
        }

        this.previous = this.current
    }
}
