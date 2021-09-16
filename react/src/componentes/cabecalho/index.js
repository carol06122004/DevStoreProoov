import Fotop from '../../assets/img/mdm.png';
import Atualizar from '../../assets/img/atualizar.svg';
import Sair from '../../assets/img/sair.svg';


import { Container } from './styled';

export default function Menu() {
    return (
        <Container>
            <div className="usuario">
              <div className="msg-usu">
                <div className="img-1"><img src="data:image/jpeg;base64,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" /></div>
                <div class="absolute">3</div>
              </div>
                <div className="texto-1">Olá, <b> Mateus Eustáquio </b></div>
            </div>
            <div className="botoes">
                <button><img src={Atualizar} alt="" /></button>
                <button className="bt"><img src={Sair} alt="" /></button>
            </div>
        </Container>
    )
}