const meuFormulario = document.getElementById('form-busca');
const meuInput = document.getElementById('campo-busca');
const informacoes = document.getElementById('informacoes');
const informacaoCep = document.getElementById('informacao-cep');
const botaoSubmit = document.querySelector('button[type="submit"]');

const textInstrucao = document.getElementById('text-instrucao');
const containerInfo = document.getElementById('container-info');

const btnMaps = document.getElementById('btn-maps');

const containerEnderecoFormatado = document.getElementById(
  'container-endereco-formatado',
);
const textoBotaoCopiar = document.getElementById('texto-botao-copiar');

const textEndereçoFormatado = document.getElementById(
  'text-endereço-formatado',
);

const btnCopiar = document.getElementById('btn-copiar');

const iconeCopiar = btnCopiar.querySelector('i');

meuFormulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  limparTela();

  const VericarSetemLetra = /[a-zÀ-ÿ]/i.test(meuInput.value);
  if (VericarSetemLetra) {
    mostrarToast('O CEP deve conter apenas números!', 'aviso');
    return;
  }

  //const meuCep = meuInput.value.trim();
  const meuCep = meuInput.value.replace(/\D/g, '').trim();
  /*   console.log('Meu cep', meuCep); */

  if (meuCep.length !== 8) {
    mostrarToast('Digite um CEP valido com 8 digitos!', 'aviso');
    return;
  }

  const valorBotaoOriginal = botaoSubmit.textContent;
  botaoSubmit.disabled = true;
  botaoSubmit.textContent = 'Buscando...';
  informacoes.textContent = 'Buscando endereço!';

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${meuCep}/json/`);

    const dados = await resposta.json();

    if (dados.erro) {
      mostrarToast('O CEP informado não foi encontrado!', 'falha');
      return;
    }

    textInstrucao.style.visibility = 'hidden';
    containerInfo.style.display = 'grid';

    const { logradouro, bairro, localidade, uf, estado } = dados;

    /*    informacoes.innerHTML = `
    Rua: ${logradouro} <br>
    Bairro: ${bairro} <br>
    Cidade: ${localidade} <br>
    UF: ${uf} <br>
    Estado: ${estado} <br>
    `; */

    const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade}, ${uf}, ${estado}`;
    /* console.log("Endereço Completo:", enderecoCompleto); */

    const enderecoFormatado = encodeURIComponent(enderecoCompleto);
    /* console.log("Endereço Formatado:",enderecoFormatado); */

    const urlCompleta = `https://www.google.com/maps/search/?api=1&query=${enderecoFormatado}`;
    /* console.log("Endereço URL:",urlCompleta); */

    btnMaps.href = urlCompleta;

    informacoes.innerHTML = `
    <span class="text-span__logradouro">${logradouro}</span><br>
    <span>Bairro:</span> ${bairro}<br>
    <span>Cidade:</span> ${localidade}<br>
    <span>UF: </span>${uf}<br>
    <span>Estado: </span>${estado}
`;
    containerEnderecoFormatado.style.display = 'block';

    const cepFormatado = meuCep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    textEndereçoFormatado.textContent = `${logradouro}, ${bairro}, ${localidade} - ${uf}, CEP: ${cepFormatado}`;

    /* console.log('Dados: ', dados); */

    informacaoCep.textContent = cepFormatado;
  } catch (erro) {
    console.log('Ocorreu um erro na requisição: ', erro);
    mostrarToast(
      'Não foi possível buscar o CEP. Tente novamente mais tarde.',
      'falha',
    );
    informacoes.textContent = '';
  } finally {
    botaoSubmit.disabled = false;
    botaoSubmit.textContent = valorBotaoOriginal;
    //meuInput.value = '';
  }
});

btnCopiar.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(textEndereçoFormatado.textContent);

    textoBotaoCopiar.textContent = 'Copiado!';
    btnCopiar.style.backgroundColor = '#d1fae5';
    btnCopiar.style.borderColor = '#10b981';

    iconeCopiar.classList.remove('fa-regular', 'fa-copy');
    iconeCopiar.classList.add('fa-solid', 'fa-check');
  } catch (erro) {
    console.error('Falha ao copiar o endereço: ', erro);
    mostrarToast(
      'Não foi possível copiar o endereço automaticamente.',
      'falha',
    );
  } finally {
    setTimeout(() => {
      textoBotaoCopiar.textContent = 'Copiar Endereço!';
      btnCopiar.style.backgroundColor = '#ffffff';
      btnCopiar.style.borderColor = 'rgba(0, 0, 0, 0.12)';

      iconeCopiar.classList.remove('fa-solid', 'fa-check');
      iconeCopiar.classList.add('fa-regular', 'fa-copy');
    }, 2000);
  }
});

function mostrarToast(mensagem, tipo) {
  const mensagemToast = document.createElement('div');
  const icone = document.createElement('i');
  const spanToast = document.createElement('span');

  mensagemToast.classList.add('toast-mensagem', tipo);
  spanToast.classList.add('span-mensagem');

  if (tipo === 'aviso') {
    icone.classList.add('fa-solid', 'icon-aviso', 'fa-triangle-exclamation');
  } else if (tipo === 'falha') {
    icone.classList.add('fa-solid', 'icon-falha', 'fa-ban');
  }

  spanToast.textContent = mensagem;

  mensagemToast.appendChild(icone);
  mensagemToast.appendChild(spanToast);

  document.body.appendChild(mensagemToast);

  setTimeout(() => {
    mensagemToast.classList.add('show');
  }, 10);

  setTimeout(() => {
    mensagemToast.classList.remove('show');

    setTimeout(() => {
      mensagemToast.remove();
    }, 300);
  }, 3000);
}

function limparTela() {
  containerInfo.style.display = 'none';
  containerEnderecoFormatado.style.display = 'none';
}
