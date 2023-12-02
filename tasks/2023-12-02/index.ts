// Tutaj skopiuj kod zadania
export class ChristmasQueue<T> {
  
  lettersQueue: Array<Letter<T>>;

  constructor(){
    this.lettersQueue = [];
  }
  isEmpty():boolean {
    return this.lettersQueue.length === 0;
  }

  enqueue(letterContent: T, priority: number): void {
    const letter = new Letter(priority, letterContent);
    if(this.isEmpty()){
        this.lettersQueue.unshift(letter);
        return;
    }
    const indexToEnqueue = this.findIndexLetter(priority);
    this.lettersQueue = [...this.lettersQueue.slice(0, indexToEnqueue), letter, ...this.lettersQueue.slice(indexToEnqueue)];
    console.log(this.lettersQueue);
  }

  dequeue(): T{
    if(this.isEmpty()){
        throw new Error('There are no letters in the queue!')
    }else{
        return this.lettersQueue.shift()!.letter ;
    }
  }

  findIndexLetter(priority: number): number {
    const index = this.lettersQueue.findIndex((letter) => letter.priority < priority);

    return index !== -1 ? index : this.lettersQueue.length;
  }

  getLength(): number{
    return this.lettersQueue.length;
  }
}

class Letter<T> {
    priority: number;
    letter: T;

    constructor(_priority: number, _letter: T){
        this.priority = _priority
        this.letter = _letter;
    }
}
    