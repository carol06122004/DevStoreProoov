import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import ReactTooltip from 'react-tooltip';

import Menu from '../../componentes/menu/index.js';
import Cabecalho from '../../componentes/cabecalho/index.js';
import Linha from '../../assets/img/linha-sep.png';
import BarraT from '../../assets/img/barra-titulos.png';
import Alterar from '../../assets/img/alterar.svg';
import Apagar from '../../assets/img/lixeira.svg';

import { useState, useEffect, useRef } from 'react';

import { Container, Parteprincipal, Bloco1, Bloco2 } from './styled'

import Api from '../../service/api';
const api = new Api;
 
export default function PagPrincipal() {
  const [produtos, setProdutos]  = useState([]);
  const [imagem, setImg]  = useState('');
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precode, setPrecoDe]  = useState('');
  const [precopor, setPrecoPor]  = useState('');
  const [avaliacao, setAvaliacao] = useState('');
  const [estoque, setEstoque]  = useState('');
  const [descricao, setDescricao] = useState('');
  const [idalterado, setIdalterado] = useState(0);

  const loading = useRef(null);

  async function Listar() {
    loading.current.continuousStart();

    let r = await api.Listar();
    setProdutos(r);

    loading.current.complete();
  }

  async function inserir() {
    if(idalterado == 0) {
      let r = await api.Inserir(nome, categoria, precode, precopor, avaliacao, descricao, estoque, imagem);

      loading.current.continuousStart();

      if(r.erro) {
          toast.error(`${r.erro}`);
      } else {
        toast.success('🚀 Produto cadastrado com sucesso!');
      }

    } else {
      let r = await api.Alterar(idalterado, nome, categoria, precode, precopor, avaliacao, descricao, estoque, imagem);

      if(r.erro) {
        toast.error(`${r.erro}`);

      } else 
        toast.dark('✏️ Produto alterado!');
    }

    loading.current.complete();

    LimparCampos();
    Listar();
  }

  function LimparCampos() {
    setImg('');
    setNome('');
    setCategoria('');
    setPrecoDe('');
    setPrecoPor('');
    setAvaliacao('');
    setEstoque('');
    setDescricao('');
    setIdalterado(0);
  }

  async function deletar(id) {
    
    loading.current.continuousStart();

    confirmAlert({

      title: 'Retira Produto',
      message: `Tem certeza que deseja retira o produto ${id} da lista ?`,
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            let r = await api.Remover(id);
            if (r.erro)
              toast.error(`${r.erro}`);
            else {
              toast.dark('🗑️ Produto retirado da lista com sucesso!!!');
              Listar();
            }
          }
        },
        {
          label: 'Não'
        }
      ]

    });

    loading.current.complete();

  }

  
  async function editar(item) {
      setNome(item.nm_produto);
      setCategoria(item.ds_categoria);
      setPrecoDe(item.vl_preco_de);
      setPrecoPor(item.vl_preco_por);
      setAvaliacao(item.vl_avaliacao);
      setPrecoPor(item.ds_produto);
      setEstoque(item.vl_estoque);
      setImg(item.img_produto);
      setIdalterado(item.id_produto);
  }



  useEffect(() => {
    Listar();
  }, []);


    return(
        <Container>
          <ToastContainer />
           <LoadingBar color="#119fdc" ref={loading} />
            <ReactTooltip />
              <div className="parte1">
              <Menu />
              </div>

              <div className="parte2">
                <Cabecalho />
                <div className="linha"> <img src={Linha} alt=""/> </div>

                <Parteprincipal>
                  <Bloco1>
                    <div className="titulo">
                        <div className="barra"><img src={BarraT} alt="" /></div>
                        <div className="texto1">{ idalterado == 0 ? "Cadastra Produto" : `Alterando Produto ${idalterado}`}</div>
                    </div>

                    <div className="inputs">

                        <div className="linha1">
                            <div className="inp1">Nome:   <input type="text" value={nome} onChange={e => setNome(e.target.value)}></input></div>
                            <div className="inp">Preço de:   <input type="number" value={precode} onChange={e => setPrecoDe(e.target.value)}></input></div>
                        </div>

                        <div className="linha1">
                            <div className="inp2">Categoria:   <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)}></input></div>
                            <div className="inp">Preço por:   <input type="number" value={precopor} onChange={e => setPrecoPor(e.target.value)}></input></div>
                        </div>

                        <div className="linha1">
                            <div className="inp3">Avaliação:   <input type="number" value={avaliacao} onChange={e => setAvaliacao(e.target.value)}></input></div>
                            <div className="inp">Estoque:   <input type="number" value={estoque} onChange={e => setEstoque(e.target.value)}></input></div>
                        </div>

                        <div className="linha1">
                            <div className="inp-d">Link Imagem:   <input type="text" value={imagem} onChange={e => setImg(e.target.value)}></input></div>
                        </div>

                        <div className="linha-d">
                            <div className="texto">Descrição:</div>
                            <div className="text">  <textarea type="text" value={descricao} onChange={e => setDescricao(e.target.value)}></textarea></div>
                            <div className="btn" ><button onClick={inserir}>{ idalterado == 0 ? "Cadastrar" : "Alterar"}</button></div>
                        </div>
                    </div>
                  </Bloco1>

                  <Bloco2>
                      <div className="titulo">
                            <div className="barra"><img src={BarraT} alt="" /></div>
                            <div className="texto1">Produtos Cadastrados</div>
                      </div>

                      <table> 
                          <thead>
                            <tr>
                              <th></th>
                              <th>ID</th>
                              <th>Produto</th>
                              <th>Categoria</th>
                              <th>Preço</th>
                              <th>Estoque</th>
                              <th className="coluna-acao"></th>
                              <th className="coluna-acao"></th>
                            </tr>
                          </thead>
                          <tbody>
                          {produtos.map((produt, i) =>
                            <tr className={i % 2 == 0 ? "alternado" : ""}>
                              <td><img src={produt.img_produto} alt="" style={{width: '40px', height: '40px'}}/></td>
                              <td> {produt.id_produto} </td>
                              <td title={produt.nm_produto}> { produt.nm_produto != null && produt.nm_produto.length >= 20 ? produt.nm_produto.substr(0, 15) + '...' : produt.nm_produto } </td>
                              <td> {produt.ds_categoria} </td>
                              <td> {produt.vl_preco_por} </td>
                              <td> {produt.qtd_estoque} </td>
                              <td className="coluna-acao"><button onClick={() => editar(produt)}><img src={Alterar} alt=""/></button></td>
                              <td className="coluna-acao"><button onClick={() => deletar(produt.id_produto)}><img src={Apagar} alt="" /></button></td>
                            </tr>
                          )}
                          </tbody> 
                        </table>
                  </Bloco2>
                </Parteprincipal>
                </div>
        </Container>

    )
}