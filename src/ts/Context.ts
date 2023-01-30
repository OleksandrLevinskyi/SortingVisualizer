export class Context {
    private static context: Context | null = null;

    currArr: Array<any>;
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
        this.currArr = [];
        this.sortFinished = false;
        this.textModeEnabled = true;
        this.svg = document.querySelector('svg');
        this.width = parseInt(window.getComputedStyle(this.svg).getPropertyValue('width'));
        this.height = window.innerHeight * .7;
        this.barCount = parseInt((document.getElementById('count') as HTMLSelectElement)?.value);
        this.barPadding = 1;
        this.barWidth = (this.width + this.barPadding) / this.barCount - this.barPadding;
        this.speed = parseInt((document.getElementById('delay') as HTMLSelectElement)?.value);
        this.comparisons = 0;
        this.arrayAccesses = 0;
        this.maxVal = 0;
    }

    public static getContext() {
        if (Context.context === null) {
            Context.context = new Context();
        }

        return Context.context;
    }
}