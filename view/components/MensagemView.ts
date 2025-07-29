export class MensagemView{
    private elemento: HTMLElement

    constructor(elemento: HTMLElement){
        this.elemento = elemento as HTMLElement;
    }

    mostrarErro(msg: string): void {
        this.elemento.textContent = msg;
        this.elemento.style.display = "block";
        this.elemento.style.color = "red";
    }

    mostrarSucesso(msg: string): void {
        this.elemento.textContent = msg;
        this.elemento.style.display = "block";
        this.elemento.style.color = "green";
    }

}