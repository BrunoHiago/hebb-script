export class PerceptronClass {
    private matrix: Record<number, number[]>;
    private weights: number[];
    private bias: number;
    private target: number[] = [1, -1];
    private learningRate: number = 0.1;

    constructor() {
        this.matrix = {
            0: Array.from({ length: 100 }, () => -1),
            1: Array.from({ length: 100 }, () => -1),
        };
        this.weights = Array.from({ length: 100 }, () => Math.random() * (0.5 - 0.5) + -0.5);
        this.bias = Math.random() * (0.5 - 0.5) + -0.5;
    }
    
    public getMatrix(): Record<number, number[]> {
        return this.matrix;
    }

    public getWeights(): number[] {
        return this.weights;
    }

    public getBias(): number {
        return this.bias;
    }

    public setMatrix(matrix: Record<number, number[]>): void {
        this.matrix = matrix;
    }

    public train(): void {
        let error = false;
        while (!error){
            error = true;
            for (let i = 0; i < 2; i++) {
                let sum = 0;
                for (let j = 0; j < 100; j++) {
                    sum += this.matrix[i][j] * this.weights[j];
                }
                sum += this.bias;
                const output = sum > 0 ? 1 : -1;
                if (output !== this.target[i]) {
                    error = false;
                    for (let j = 0; j < 100; j++) {
                        this.weights[j] += this.learningRate * this.target[i] * this.matrix[i][j];
                    }
                    this.bias += this.learningRate * this.target[i];
                }
            }
        }
    }

    public test(matrix: number[]): number {
        let sum = 0;
        for (let i = 0; i < 100; i++) {
            sum += matrix[i] * this.weights[i];
        }
        return sum + this.bias > 0 ? 1 : -1;
    }
}