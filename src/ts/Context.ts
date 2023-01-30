export class Context {
    private static context: Context | null = null;

    currArr: Array<number>;
    sortFinished: boolean;
    textModeEnabled: boolean;
    svg: any;
    width: number;
    height: number;
    speed: number;
    comparisons: number;
    arrayAccesses: number;
    barCount: number;
    barPadding: number;
    barWidth: number;
    maxVal: number;
    yScale: any;

    private constructor() {
        this.sortFinished = false;
        this.textModeEnabled = true;
        this.svg = document.querySelector('svg');
        this.width = parseInt(window.getComputedStyle(this.svg).getPropertyValue('width'));
        this.height = window.innerHeight * .7;
        this.barCount = parseInt(document.getElementById('bar_count')?.value ?? 0);
        this.barPadding = 1;
        this.barWidth = (this.width + this.barPadding) / this.barCount - this.barPadding;
        this.speed = parseInt(document.getElementById('delay')?.value ?? 0);
        this.comparisons = 0;
        this.arrayAccesses = 0;
    }

    public static getContext() {
        if (Context.context === null) {
            Context.context = new Context();
        }

        return Context.context;
    }
}