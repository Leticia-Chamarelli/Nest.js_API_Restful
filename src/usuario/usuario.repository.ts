import { Injectable } from "@nestjs/common";
import { UsuaruiEntity } from "./usuario.entity";
import { EmailEhUnicoValidator } from "./validacao/email-unico-validator";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuaruiEntity = [];

    async salvar(usuario: UsuaruiEntity) {
        this.usuarios.push(usuario);
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
    }


    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === EmailEhUnicoValidator
        );
        
        return possivelUsuario !== undefined; 
    }

    private buscaPorId(id: string) {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        ); 

        if(!possivelUsuario) {
            throw new Error('Usuário não existe'); 
        }
        return possivelUsuario; 
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuaruiEntity>) {
        const usuario = this.buscaPorId(id)

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if(chave === 'id') {
                return; 
            }

            possivelUsuario[chave] = valor; 
        
        });

        return possivelUsuario; 
    }

    async remove(id: string) {
        const usuario = this.buscaPorId(id); 
        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        );

        return usuario; 
    }

}