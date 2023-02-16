import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioRepository } from "./usuario.repository";
import { v4 as uuid } from 'uuid';
import { ListaUsuaruiDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}


    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        const UsuaruiEntity = new UsuarioEntity(); 
        UsuaruiEntity.email = dadosDoUsuario.email; 
        UsuaruiEntity.senha = dadosDoUsuario.senha; 
        UsuaruiEntity.nome = dadosDoUsuario.nome; 
        UsuaruiEntity.id = uuid();
        
        this.usuarioRepository.salvar(UsuaruiEntity);
        return { 
            usuario: new ListaUsuaruiDTO(UsuaruiEntity.id, UsuaruiEntity.nome),
            message: 'usuário criado com sucesso' 
        };
        
    }

    @Get()
    async listaUsuarios() {
        const usuariosSsalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSsalvos.map(
            usuario => new ListaUsuaruioDTO(
                usuario.id, 
                usuario.nome
            )
        );

        return usuariosLista; 
    }
    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);

        return {
            usuario: usuarioAtualizado, 
            messagem: 'usuário atualizado com sucesso', 
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioremovido = await this.usuarioRepository.remove(id); 

        return{
            usuario: usuarioremovido,
            messagem: 'uduário removido com sucesso'
        }
    }

}