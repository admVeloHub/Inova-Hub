/**
 * VeloHub V3 - Artigos HTML
 * Artigos extraídos dos arquivos HTML fornecidos
 * VERSION: v1.0.0 | DATE: 2025-01-30
 */

export const artigosHTML = [
  {
    _id: 'artigo-pagamento-antecipado',
    title: 'Pagamento Antecipado com Desconto Duplicado',
    category: 'Financeiro',
    tag: 'Pagamento',
    description: 'Entenda como funciona o processo de estorno quando há desconto em duplicidade',
    content: `
      <div class="artigo-html-content">
        <div class="section">
          <h2>Situação</h2>
          <p>O cliente realiza o pagamento antecipado do Crédito do Trabalhador, porém a informação de desconto no holerite já foi enviada para a empresa e não é possível retirar. Nesse caso, o desconto será realizado normalmente.</p>
        </div>

        <div class="visual-container">
          <h2 style="border: none; margin-top: 0; color: #000058;">Como Funciona o Processo</h2>
          <div class="process-flow">
            <div class="process-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <div class="step-title">Cliente Quitou Antecipadamente</div>
                <div class="step-description">O cliente pagou o contrato antes da data de vencimento.</div>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="process-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <div class="step-title">Empresa Realiza o Desconto</div>
                <div class="step-description">A empresa desconta o valor normalmente do holerite, pois a informação já havia sido enviada.</div>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="process-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <div class="step-title">Caixa Econômica Recebe</div>
                <div class="step-description">A empresa encaminha o valor para a Caixa Econômica Federal.</div>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="process-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <div class="step-title">Caixa Identifica Duplicidade</div>
                <div class="step-description">A Caixa percebe que o valor foi pago duas vezes (antecipado + desconto).</div>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="process-step">
              <div class="step-number">5</div>
              <div class="step-content">
                <div class="step-title">Caixa Devolve para a Velotax</div>
                <div class="step-description">Próximo ao dia 20 do mês de referência, a Caixa devolve o valor.</div>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="process-step">
              <div class="step-number">6</div>
              <div class="step-content">
                <div class="step-title">Velotax Realiza Estorno</div>
                <div class="step-description">A Velotax faz o estorno automático via Pix para o cliente.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Timeline do Processo</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-date">Dia 1–19</div>
              <div class="timeline-text">A empresa realiza o desconto e encaminha para a Caixa Econômica.</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">Dia 20</div>
              <div class="timeline-text">A Caixa Econômica identifica a duplicidade e devolve o valor para a Velotax.</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">Dia 20–25</div>
              <div class="timeline-text">A Velotax processa o estorno automaticamente via Pix.</div>
            </div>
          </div>
        </div>

        <div class="highlight-box">
          <p><strong>⚠️ Importante:</strong> Esse processo é automático. A Velotax tem até o dia 25 para concluir o estorno. O cliente não precisa fazer nada, apenas aguardar o crédito na conta.</p>
        </div>

        <div class="key-points">
          <h3>Pontos-Chave para o Agente</h3>
          <ul>
            <li>O desconto em duplicidade não é culpa do cliente nem da Velotax.</li>
            <li>A Caixa Econômica identifica automaticamente e devolve o valor.</li>
            <li>O estorno é automático e não requer ação do cliente.</li>
            <li>O prazo para estorno é até o dia 25 do mês de referência.</li>
            <li>Se o cliente não receber até o dia 25, entre em contato com o supervisor.</li>
          </ul>
        </div>

        <div class="section">
          <h2>O que Dizer ao Cliente</h2>
          <p>"Entendo sua preocupação. Quando você pagou antecipadamente, a empresa já tinha a informação de desconto e realizou normalmente. A Caixa Econômica vai identificar que o valor foi pago duas vezes e vai devolver para nós. Nós faremos o estorno automaticamente para você até o dia 25. Você não precisa fazer nada, é só aguardar o crédito na sua conta."</p>
        </div>
      </div>
    `,
    createdAt: new Date('2024-10-01').toISOString(),
  },
  {
    _id: 'artigo-seguro-saude-simplificada',
    title: 'Seguro Saúde Simplificada',
    category: 'Seguros',
    tag: 'Seguro Saúde',
    description: 'Sua rede de saúde e bem-estar ao alcance de um clique',
    content: `
      <div class="artigo-html-content">
        <div class="section">
          <h2>O que é o Seguro Saúde Simplificada?</h2>
          <p>O Seguro Saúde Simplificada é um produto de Acidente Pessoal que garante o pagamento de uma indenização aos beneficiários em caso de Morte Acidental. Além da proteção principal, você tem acesso a uma ampla rede de assistências de saúde e bem-estar, como teleconsultas médicas, assistência odontológica de urgência, orientação nutricional e psicológica.</p>
          <div class="highlight-box">
            <strong>💡 Ideal para:</strong> Quem busca proteção física contra acidentes e acesso a serviços de saúde de forma simples e acessível.
          </div>
        </div>

        <div class="section">
          <h2>Características principais</h2>
          <div class="features-grid">
            <div class="feature-card">
              <h4>Proteção Garantida</h4>
              <p>Indenização de R$ 2.000 em caso de morte acidental</p>
            </div>
            <div class="feature-card">
              <h4>100% Online</h4>
              <p>Contratação simples e rápida pelo app Velotax</p>
            </div>
            <div class="feature-card">
              <h4>Baixo Custo</h4>
              <p>Apenas R$ 19,90 por mês</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Como contratar o Seguro Saúde Simplificada?</h2>
          <p>A contratação é simples, rápida e 100% online. Você pode fazer tudo pelo app Velotax em poucos minutos:</p>
          <div class="steps">
            <div class="step">
              <h4>Acesse a seção de Seguros</h4>
              <p>Abra o app Velotax e clique na aba "Seguros" na home para ver as ofertas disponíveis.</p>
            </div>
            <div class="step">
              <h4>Clique em "Simular agora"</h4>
              <p>Selecione o card do Seguro Saúde Simplificada e clique em "Simular agora".</p>
            </div>
            <div class="step">
              <h4>Revise as coberturas</h4>
              <p>Você verá todas as coberturas e assistências incluídas. Clique em cada uma para mais detalhes.</p>
            </div>
            <div class="step">
              <h4>Escolha a forma de pagamento</h4>
              <p>Selecione entre: Mensal (PIX ou cartão), Anual à vista (PIX ou cartão) ou Parcelado (até 12x no cartão).</p>
            </div>
            <div class="step">
              <h4>Confirme o pagamento</h4>
              <p>Preencha os dados do cartão ou copie o código PIX e realize o pagamento.</p>
            </div>
            <div class="step">
              <h4>Pronto!</h4>
              <p>Você receberá a confirmação da contratação. A apólice fica disponível no menu "Seguros" do app.</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>O que está incluso no Seguro Saúde Simplificada?</h2>
          <h3>Cobertura Principal: Morte Acidental</h3>
          <div class="coverage-card">
            <h4>Morte Acidental (MA)</h4>
            <div class="detail">
              <strong>O que cobre:</strong>
              Garante o pagamento de R$ 2.000,00 aos beneficiários em caso de morte exclusivamente decorrente de acidente pessoal.
            </div>
            <div class="detail">
              <strong>Carência:</strong>
              Sem carência (exceto em caso de suicídio ou tentativa, com carência de 2 anos).
            </div>
            <div class="detail">
              <strong>Franquia:</strong>
              Não se aplica.
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Valores e Formas de Pagamento</h2>
          <p>O Seguro Saúde Simplificada custa apenas <strong>R$ 19,90 por mês</strong>.</p>
          <h3>Formas de Pagamento</h3>
          <div class="coverage-grid">
            <div class="coverage-card">
              <h4>Mensal</h4>
              <p>Pague R$ 19,90 a cada mês via PIX ou cartão de crédito. Você pode cancelar a qualquer momento.</p>
            </div>
            <div class="coverage-card">
              <h4>Anual à Vista</h4>
              <p>Pague uma única vez via PIX ou cartão de crédito e economize na assinatura anual.</p>
            </div>
            <div class="coverage-card">
              <h4>Parcelado</h4>
              <p>Divida a assinatura anual em até 12 parcelas no cartão de crédito.</p>
            </div>
          </div>
        </div>
      </div>
    `,
    createdAt: new Date('2025-12-01').toISOString(),
  },
  {
    _id: 'artigo-seguro-celular',
    title: 'Seguro Celular Velotax',
    category: 'Seguros',
    tag: 'Seguro Celular',
    description: 'Material de Atendimento - Guia Prático para o Time',
    content: `
      <div class="artigo-html-content">
        <div class="section">
          <h2>O Que é o Seguro Celular Velotax?</h2>
          <p class="section-intro">Uma proteção completa para o celular do cliente contra os principais riscos do dia a dia.</p>
          <ul class="bullet-list">
            <li><strong>Proteção contra roubo, furto, perda, danos acidentais e problemas técnicos</strong></li>
            <li>Reposição do aparelho por um modelo novo ou usado de igual ou superior valor</li>
            <li>Reparo ágil do aparelho em até 5 dias úteis</li>
            <li>Contratação 100% online, direto no app Velotax</li>
            <li>Benefício extra: participação em sorteio mensal de R$ 10 mil em dinheiro</li>
          </ul>
        </div>

        <div class="section">
          <h2>Como o Cliente Contrata?</h2>
          <p class="section-intro">O processo é simples, rápido e totalmente online.</p>
          <ul class="bullet-list">
            <li>Acessa a aba <strong>"Seguros"</strong> no app Velotax</li>
            <li>Visualiza as opções de cobertura disponíveis para seu aparelho</li>
            <li>Escolhe qual proteção deseja contratar</li>
            <li>Informa o <strong>IMEI do celular</strong> (número que identifica o aparelho)</li>
            <li>Seleciona a forma de pagamento: <strong>Pix ou Cartão de Crédito</strong></li>
            <li>Confirma a contratação e recebe a apólice</li>
          </ul>
          <div class="highlight-box">
            <h3>⏰ Importante: Período de Carência</h3>
            <p>A proteção começa a valer <strong>após 30 dias</strong> da contratação. O cliente está protegido a partir do 31º dia.</p>
          </div>
        </div>

        <div class="section">
          <h2>As 4 Opções de Cobertura</h2>
          <p class="section-intro">O cliente escolhe qual nível de proteção deseja para seu celular.</p>
          <div class="cards-grid">
            <div class="card">
              <h3>🛡️ Proteção Total</h3>
              <p><strong>Cobre:</strong></p>
              <ul class="bullet-list">
                <li>Roubo, furto e perda</li>
                <li>Quebras e danos por líquido</li>
                <li>Defeitos técnicos</li>
              </ul>
              <p><strong>Valor:</strong> 30% do valor do celular/ano</p>
              <p><strong>Franquia:</strong> 20% (roubo/furto) ou 15% (quebras)</p>
            </div>
            <div class="card">
              <h3>🔒 Roubo e Furto</h3>
              <p><strong>Cobre:</strong></p>
              <ul class="bullet-list">
                <li>Roubo qualificado</li>
                <li>Furto simples</li>
                <li>Perda</li>
              </ul>
              <p><strong>Valor:</strong> 25% do valor do celular/ano</p>
              <p><strong>Franquia:</strong> 20%</p>
            </div>
            <div class="card">
              <h3>💥 Proteção Acidentes</h3>
              <p><strong>Cobre:</strong></p>
              <ul class="bullet-list">
                <li>Quebras de tela e câmera</li>
                <li>Danos por líquido</li>
                <li>Defeitos técnicos</li>
              </ul>
              <p><strong>Valor:</strong> 25% do valor do celular/ano</p>
              <p><strong>Franquia:</strong> 20%</p>
            </div>
            <div class="card">
              <h3>📱 Proteção Tela</h3>
              <p><strong>Cobre:</strong></p>
              <ul class="bullet-list">
                <li>Quebra de tela</li>
                <li>Quebra de display</li>
              </ul>
              <p><strong>Valor:</strong> 15% do valor do celular/ano</p>
              <p><strong>Franquia:</strong> 15%</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>O Que Fazer em Caso de Problema com o Celular?</h2>
          <p class="section-intro">O cliente deve entrar em contato com a Pitzi (seguradora parceira), não com a Velotax.</p>
          <ul class="bullet-list">
            <li>A Pitzi é responsável por analisar o sinistro</li>
            <li>A Pitzi autoriza a reposição ou reparo do aparelho</li>
            <li>Velotax não participa do processo de análise</li>
          </ul>
          <div class="contact-box">
            <h3>📞 Contato da Pitzi (Seguradora)</h3>
            <div class="contact-item"><strong>Telefone:</strong> 11 2579-0068 (seg-sex, 9h às 18h)</div>
            <div class="contact-item"><strong>WhatsApp:</strong> 11 3777-0435 (seg-sex, 9h às 20h; sábados, 9h às 15h)</div>
            <div class="contact-item"><strong>Chat:</strong> disponível seg-sex, 9h às 20h</div>
            <div class="contact-item"><strong>Site:</strong> Pitzi.com.br</div>
          </div>
        </div>
      </div>
    `,
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    _id: 'artigo-seguro-divida-zero',
    title: 'Seguro Dívida Zero Velotax',
    category: 'Seguros',
    tag: 'Seguro Dívida Zero',
    description: 'A proteção financeira que garante suas contas em dia',
    content: `
      <div class="artigo-html-content">
        <div class="section">
          <h2>O Que é o Seguro Dívida Zero?</h2>
          <p class="section-intro">
            O Seguro Dívida Zero (Perda de Renda) é um seguro que te ajuda a pagar suas dívidas (como parcelas de empréstimo ou cartão de crédito) se você, profissional CLT, perder involuntariamente a sua fonte de renda. Ele garante o pagamento de uma indenização em caso de <strong>desemprego involuntário</strong> e oferece um valor diário em caso de <strong>incapacidade temporária por acidente.</strong>
          </p>
          <div class="highlight-box">
            <h3>Benefícios Adicionais</h3>
            <ul class="bullet-list">
              <li><strong>Assistências</strong> que ajudam o cliente em um momento sensível, como a <strong>Orientação Psicológica.</strong></li>
              <li>Possibilidade de ganhar um <strong>sorteio mensal de R$ 10 mil</strong> em dinheiro.</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>Características e Como Funciona</h2>
          <div class="two-column">
            <div class="column">
              <h3>Características do Produto</h3>
              <ul class="bullet-list">
                <li><strong>Adesão:</strong> Facultativa ao seguro.</li>
                <li><strong>Processo:</strong> Contratação <strong>100% online</strong>, sem complicações.</li>
                <li><strong>Valor:</strong> <strong>R$ 29,90 por mês</strong> (plano único).</li>
                <li><strong>Público-Alvo:</strong> Clientes Velotax, preferencialmente com vínculo CLT e/ou que buscam proteção contra perda de renda.</li>
                <li><strong>Vigência:</strong> A partir de 01/12/2025, sem término previsto.</li>
                <li><strong>Região Participante:</strong> Nível nacional.</li>
              </ul>
            </div>
            <div class="column">
              <h3>Jornada de Contratação</h3>
              <ul class="bullet-list">
                <li>O cliente acessa a aba <strong>"Seguros"</strong> na home do App Velotax e clica em <strong>"Simular agora"</strong> no card do Seguro Dívida Zero.</li>
                <li>Visualiza a descrição das coberturas e assistências (plano único de R$ 29,90/mês).</li>
                <li>Escolhe o <strong>Plano/Forma de Pagamento</strong> (Mensal, Anual à vista ou Anual parcelado em até 12x).</li>
                <li>Seleciona a modalidade de pagamento (<strong>Pix ou Cartão de crédito</strong>).</li>
                <li>Preenche os dados e realiza o pagamento.</li>
                <li>Recebe a tela <strong>"Parabéns pela contratação"</strong>. A apólice pode ser consultada no menu "Seguros".</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Coberturas e Assistências</h2>
          <div class="two-column">
            <div class="column">
              <h3>A. Desemprego Involuntário (Perda de Renda)</h3>
              <ul class="bullet-list">
                <li><strong>O que cobre:</strong> Indenização caso o Segurado (regido pela CLT) perca involuntariamente o vínculo empregatício (sem justa causa).</li>
                <li><strong>Capital Segurado:</strong> Cobre até <strong>6 parcelas de R$1.000,00</strong> cada, totalizando <strong>R$6.000,00.</strong></li>
                <li><strong>Carência:</strong> <strong>31 dias</strong> (a partir da vigência do seguro).</li>
                <li><strong>Franquia:</strong> <strong>31 dias</strong> consecutivos (a partir do início do desemprego).</li>
              </ul>
            </div>
            <div class="column">
              <h3>B. Incapacidade Temporária por Acidente Pessoal (DIT-AP)</h3>
              <ul class="bullet-list">
                <li><strong>O que cobre:</strong> Pagamento de diárias ao segurado durante o período de incapacidade contínua e ininterrupta causada por um acidente que o impeça de trabalhar.</li>
                <li><strong>Capital Segurado:</strong> Cobre no máximo <strong>90 diárias de até R$200,00</strong> cada.</li>
                <li><strong>Carência:</strong> Não se aplica.</li>
                <li><strong>Franquia:</strong> <strong>15 dias</strong> (a partir da data de afastamento).</li>
              </ul>
            </div>
          </div>
          <h3>Assistências Adicionais</h3>
          <ul class="bullet-list">
            <li><strong>Sorteio:</strong> 1 Sorteio mensal em dinheiro de <strong>R$10 mil</strong> (valor bruto de IR), realizado no último sábado de cada mês.</li>
            <li><strong>Orientação Psicológica:</strong> Assistência que oferece orientação psicológica preliminar, básica e preventiva por meio de contato telefônico com psicólogos.</li>
          </ul>
        </div>

        <div class="section">
          <h2>Canais de Atendimento</h2>
          <div class="two-column">
            <div class="column">
              <h3>Atendimento Velotax (Sobre o Produto)</h3>
              <ul class="bullet-list">
                <li><strong>Papel do Atendimento Velotax:</strong>
                  <ul>
                    <li>Fornecer informações sobre as características do produto.</li>
                    <li>Sanar dúvidas sobre o produto (como acionar o sinistro junto ao parceiro Sabemi).</li>
                    <li>Abrir chamados para tratativas internas em caso de contestações/reclamações.</li>
                  </ul>
                </li>
                <li><strong>Canais:</strong> Fale Conosco (3003 7293 / 0800 800 0049) e Chat aplicativo Velotax.</li>
              </ul>
            </div>
            <div class="column">
              <h3>Atendimento Sabemi (Sinistros e Assuntos Gerais)</h3>
              <ul class="bullet-list">
                <li><strong>Atendimentos em geral, dúvidas, sinistros e outros assuntos:</strong> 0800 880 1900 e WhatsApp (51) 9 9528-0140.</li>
                <li><strong>Orientação Psicológica:</strong> 0800 775 1911.</li>
                <li><strong>Importante:</strong> Em caso de acionamento do seguro (sinistro), o caso deve ser tratado <strong>direto pelo parceiro/seguradora Sabemi</strong> para fins de regulação e acompanhamento.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    createdAt: new Date('2025-12-01').toISOString(),
  },
];
