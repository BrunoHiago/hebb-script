export class PerceptronClass {
    private matrix: Record<number, number[]>;
    private weights: number[];
    private bias: number;
    private target: number[] = [1, -1];
    private learningRate: number = 0.1;
    private logs: string[] = [];

    constructor() {
        this.matrix = {
            0: Array.from({ length: 100 }, () => -1),
            1: Array.from({ length: 100 }, () => -1),
        };
        this.weights = Array.from({ length: 100 }, () => Math.random() - 0.5);
        this.bias = Math.random() - 0.5;
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

     public async train(): Promise<void> {
        let error = false;
        let ciclo = 1;
        this.logs = [];
        this.logs.push("Iniciando treinamento...");
        this.logs.push(`Pesos iniciais: ${this.weights}`);
        this.logs.push(`Bias inicial: ${this.bias}`);
        this.logs.push(`Taxa de aprendizado: ${this.learningRate}`);
        this.logs.push(`Alvos: ${this.target}`);
        this.logs.push("================================================\n\n");
        while (!error){
            error = true;
            this.logs.push(`\nCiclo ${ciclo}`);
            for (let i = 0; i < 2; i++) {
                let sum = 0;
                for (let j = 0; j < 100; j++) {
                    sum += this.matrix[i][j] * this.weights[j];
                }
                sum += this.bias;
                const output = sum > 0 ? 1 : -1;

                this.logs.push(`Entrada ${i}: Saída: ${output} - Alvo: ${this.target[i]}`);
                if (output !== this.target[i]) {
                    error = false;
                    for (let j = 0; j < 100; j++) {
                        this.weights[j] += this.learningRate * this.target[i] * this.matrix[i][j];
                    }
                    this.bias += this.learningRate * this.target[i];
                }
            }
            ciclo++;
            
            
        }
        this.logs.push("\n\nTreinamento finalizado!");
        this.logs.push(`Pesos: ${this.weights}`);
        this.logs.push(`Bias: ${this.bias}`);
    }

    public test(matrix: number[]): number {
        let sum = 0;
        for (let i = 0; i < 100; i++) {
            sum += matrix[i] * this.weights[i];
        }
        return sum + this.bias > 0 ? 1 : -1;
    }

    public getLogs(): string[] {
        return this.logs;
    }
}