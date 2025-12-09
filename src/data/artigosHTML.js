/**
 * VeloHub V3 - Artigos HTML
 * Artigos extra├¡dos dos arquivos HTML fornecidos
 * VERSION: v1.0.0 | DATE: 2025-01-30
 */

export const artigosHTML = [
  {
    _id: 'artigo-pagamento-antecipado',
    title: 'Pagamento Antecipado com Desconto Duplicado',
    category: 'Financeiro',
    tag: 'Pagamento',
    description: 'Entenda como funciona o processo de estorno quando h├í desconto em duplicidade',
    content: `
      <div class="artigo-html-content">
        <div class="section">
          <h2>Situa├º├úo</h2>
          <p>O cliente realiza o pagamento antecipado do Cr├®dito do Trabalhador, por├®m a informa├º├úo de desconto no holerite j├í foi enviada para a empresa e n├úo ├® poss├¡vel retirar. Nesse caso, o desconto ser├í realizado normalmente.</p>
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
            <div class="arrow">Ôåô</div>
            <div class="process-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <div class="step-title">Empresa Realiza o Desconto</div>
                <div class="step-description">A empresa desconta o valor normalmente do holerite, pois a informa├º├úo j├í havia sido enviada.</div>
              </div>
            </div>
            <div class="arrow">Ôåô</div>
            <div class="process-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <div class="step-title">Caixa Econ├┤mica Recebe</div>
                <div class="step-description">A empresa encaminha o valor para a Caixa Econ├┤mica Federal.</div>
              </div>
            </div>
            <div class="arrow">Ôåô</div>
            <div class="process-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <div class="step-title">Caixa Identifica Duplicidade</div>
                <div class="step-description">A Caixa percebe que o valor foi pago duas vezes (antecipado + desconto).</div>
              </div>
            </div>
            <div class="arrow">Ôåô</div>
            <div class="process-step">
              <div class="step-number">5</div>
              <div class="step-content">
                <div class="step-title">Caixa Devolve para a Velotax</div>
                <div class="step-description">Pr├│ximo ao dia 20 do m├¬s de refer├¬ncia, a Caixa devolve o valor.</div>
              </div>
            </div>
            <div class="arrow">Ôåô</div>
            <div class="process-step">
              <div class="step-number">6</div>
              <div class="step-content">
                <div class="step-title">Velotax Realiza Estorno</div>
                <div class="step-description">A Velotax faz o estorno autom├ítico via Pix para o cliente.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Timeline do Processo</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-date">Dia 1ÔÇô19</div>
              <div class="timeline-text">A empresa realiza o desconto e encaminha para a Caixa Econ├┤mica.</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">Dia 20</div>
              <div class="timeline-text">A Caixa Econ├┤mica identifica a duplicidade e devolve o valor para a Velotax.</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">Dia 20ÔÇô25</div>
              <div class="timeline-text">A Velotax processa o estorno automaticamente via Pix.</div>
            </div>
          </div>
        </div>

        <div class="highlight-box">
          <p><strong>­ƒæë Importante:</strong> Esse processo ├® autom├ítico. A Velotax tem at├® o dia 25 para concluir o estorno. O cliente n├úo precisa fazer nada, apenas aguardar o cr├®dito na conta.</p>
        </div>

        <div class="key-points">
          <h3>Pontos-Chave para o Agente</h3>
          <ul>
            <li>O desconto em duplicidade n├úo ├® culpa do cliente nem da Velotax.</li>
            <li>A Caixa Econ├┤mica identifica automaticamente e devolve o valor.</li>
            <li>O estorno ├® autom├ítico e n├úo requer a├º├úo do cliente.</li>
            <li>O prazo para estorno ├® at├® o dia 25 do m├¬s de refer├¬ncia.</li>
            <li>Se o cliente n├úo receber at├® o dia 25, entre em contato com o supervisor.</li>
          </ul>
        </div>

        <div class="section">
          <h2>O que Dizer ao Cliente</h2>
          <p>"Entendo sua preocupa├º├úo. Quando voc├¬ pagou antecipadamente, a empresa j├í tinha a informa├º├úo de desconto e realizou normalmente. A Caixa Econ├┤mica vai identificar que o valor foi pago duas vezes e vai devolver para n├│s. N├│s faremos o estorno automaticamente para voc├¬ at├® o dia 25. Voc├¬ n├úo precisa fazer nada, ├® s├│ aguardar o cr├®dito na sua conta."</p>
        </div>
      </div>
    `,
    createdAt: new Date('2024-10-01').toISOString(),
  },
  {
    _id: 'artigo-seguro-saude-simplificada',
    title: 'Seguro Sa├║de Simplificada',
    category: 'Seguros',
    tag: 'Seguro Sa├║de',
    description: 'Sua rede de sa├║de e bem-estar ao alcance de um clique',
    content: `
      <div class="artigo-html-content">
        <div class="section">
          <h2>O que ├® o Seguro Sa├║de Simplificada?</h2>
          <p>O Seguro Sa├║de Simplificada ├® um produto de Acidente Pessoal que garante o pagamento de uma indeniza├º├úo aos benefici├írios em caso de Morte Acidental. Al├®m da prote├º├úo principal, voc├¬ tem acesso a uma ampla rede de assist├¬ncias de sa├║de e bem-estar, como teleconsultas m├®dicas, assist├¬ncia odontol├│gica de urg├¬ncia, orienta├º├úo nutricional e psicol├│gica.</p>
          <div class="highlight-box">
            <strong>­ƒÆí Ideal para:</strong> Quem busca prote├º├úo b├ísica contra acidentes e acesso a servi├ºos de sa├║de de forma simples e acess├¡vel.
          </div>
        </div>

        <div class="section">
          <h2>Caracter├¡sticas principais</h2>
          <div class="features-grid">
            <div class="feature-card">
              <h4>Prote├º├úo Garantida</h4>
              <p>Indeniza├º├úo de R$ 2.000 em caso de morte acidental</p>
            </div>
            <div class="feature-card">
              <h4>100% Online</h4>
              <p>Contrata├º├úo simples e r├ípida pelo app Velotax</p>
            </div>
            <div class="feature-card">
              <h4>Baixo Custo</h4>
              <p>Apenas R$ 19,90 por m├¬s</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Como contratar o Seguro Sa├║de Simplificada?</h2>
          <p>A contrata├º├úo ├® simples, r├ípida e 100% online. Voc├¬ pode fazer tudo pelo app Velotax em poucos minutos:</p>
          <div class="steps">
            <div class="step">
              <h4>Acesse a se├º├úo de Seguros</h4>
              <p>Abra o app Velotax e clique na aba "Seguros" na home para ver as ofertas dispon├¡veis.</p>
            </div>
            <div class="step">
              <h4>Clique em "Simular agora"</h4>
              <p>Selecione o card do Seguro Sa├║de Simplificada e clique em "Simular agora".</p>
            </div>
            <div class="step">
              <h4>Revise as coberturas</h4>
              <p>Voc├¬ ver├í todas as coberturas e assist├¬ncias inclu├¡das. Clique em cada uma para mais detalhes.</p>
            </div>
            <div class="step">
              <h4>Escolha a forma de pagamento</h4>
              <p>Selecione entre: Mensal (PIX ou cart├úo), Anual ├á vista (PIX ou cart├úo) ou Parcelado (at├® 12x no cart├úo).</p>
            </div>
            <div class="step">
              <h4>Confirme o pagamento</h4>
              <p>Preencha os dados do cart├úo ou copie o c├│digo PIX e realize o pagamento.</p>
            </div>
            <div class="step">
              <h4>Pronto!</h4>
              <p>Voc├¬ receber├í a confirma├º├úo da contrata├º├úo. A ap├│lice fica dispon├¡vel no menu "Seguros" do app.</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>O que est├í incluso no Seguro Sa├║de Simplificada?</h2>
          <h3>Cobertura Principal: Morte Acidental</h3>
          <div class="coverage-card">
            <h4>Morte Acidental (MA)</h4>
            <div class="detail">
              <strong>O que cobre:</strong>
              Garante o pagamento de R$ 2.000,00 aos benefici├írios em caso de morte exclusivamente decorrente de acidente pessoal.
            </div>
            <div class="detail">
              <strong>Car├¬ncia:</strong>
              Sem car├¬ncia (exceto em caso de suic├¡dio ou tentativa, com car├¬ncia de 2 anos).
            </div>
            <div class="detail">
              <strong>Franquia:</strong>
              N├úo se aplica.
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Valores e Formas de Pagamento</h2>
          <p>O Seguro Sa├║de Simplificada custa apenas <strong>R$ 19,90 por m├¬s</strong>.</p>
          <h3>Formas de Pagamento</h3>
          <div class="coverage-grid">
            <div class="coverage-card">
              <h4>Mensal</h4>
              <p>Pague R$ 19,90 a cada m├¬s via PIX ou cart├úo de cr├®dito. Voc├¬ pode cancelar a qualquer momento.</p>
            </div>
            <div class="coverage-card">
              <h4>Anual ├á Vista</h4>
              <p>Pague uma ├║nica vez via PIX ou cart├úo de cr├®dito e economize na assinatura anual.</p>
            </div>
            <div class="coverage-card">
              <h4>Parcelado</h4>
              <p>Divida a assinatura anual em at├® 12 parcelas no cart├úo de cr├®dito.</p>
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
    description: 'Material de Atendimento - Guia Pr├ítico para o Time',
    content: `
      <div class="artigo-html-content">
        <div class="section">
          <h2>O Que ├® o Seguro Celular Velotax?</h2>
          <p class="section-intro">Uma prote├º├úo completa para o celular do cliente contra os principais riscos do dia a dia.</p>
          <ul class="bullet-list">
            <li><strong>Prote├º├úo contra roubo, furto, perda, danos acidentais e problemas t├®cnicos</strong></li>
            <li>Reposi├º├úo do aparelho por um modelo novo ou usado de igual ou superior valor</li>
            <li>Reparo ├ígil do aparelho em at├® 5 dias ├║teis</li>
            <li>Contrata├º├úo 100% online, direto no app Velotax</li>
            <li>Benef├¡cio extra: participa├º├úo em sorteio mensal de R$ 10 mil em dinheiro</li>
          </ul>
        </div>

        <div class="section">
          <h2>Como o Cliente Contrata?</h2>
          <p class="section-intro">O processo ├® simples, r├ípido e totalmente online.</p>
          <ul class="bullet-list">
            <li>Acessa a aba <strong>"Seguros"</strong> no app Velotax</li>
            <li>Visualiza as op├º├Áes de cobertura dispon├¡veis para seu aparelho</li>
            <li>Escolhe qual prote├º├úo deseja contratar</li>
            <li>Informa o <strong>IMEI do celular</strong> (n├║mero que identifica o aparelho)</li>
            <li>Seleciona a forma de pagamento: <strong>Pix ou Cart├úo de Cr├®dito</strong></li>
            <li>Confirma a contrata├º├úo e recebe a ap├│lice</li>
          </ul>
          <div class="highlight-box">
            <h3>ÔÅ▒´©Å Importante: Per├¡odo de Car├¬ncia</h3>
            <p>A prote├º├úo come├ºa a valer <strong>ap├│s 30 dias</strong> da contrata├º├úo. O cliente est├í protegido a partir do 31┬║ dia.</p>
          </div>
        </div>

        <div class="section">
          <h2>As 4 Op├º├Áes de Cobertura</h2>
          <p class="section-intro">O cliente escolhe qual n├¡vel de prote├º├úo deseja para seu celular.</p>
          <div class="cards-grid">
            <div class="card">
              <h3>­ƒøí´©Å Prote├º├úo Total</h3>
              <p><strong>Cobre:</strong></p>
              <ul class="bullet-list">
                <li>Roubo, furto e perda</li>
                <li>Quebras e danos por l├¡quido</li>
                <li>Defeitos t├®cnicos</li>
              </ul>
              <p><strong>Valor:</strong> 30% do valor do celular/ano</p>
              <p><strong>Franquia:</strong> 20% (roubo/furto) ou 15% (quebras)</p>
            </div>
            <div class="card">
              <h3>­ƒÜ¿ Roubo e Furto</h3>
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
              <h3>­ƒÆÑ Prote├º├úo Acidentes</h3>
              <p><strong>Cobre:</strong></p>
              <ul class="bullet-list">
                <li>Quebras de tela e c├ómera</li>
                <li>Danos por l├¡quido</li>
                <li>Defeitos t├®cnicos</li>
              </ul>
              <p><strong>Valor:</strong> 25% do valor do celular/ano</p>
              <p><strong>Franquia:</strong> 20%</p>
            </div>
            <div class="card">
              <h3>­ƒô▒ Prote├º├úo Tela</h3>
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
          <p class="section-intro">O cliente deve entrar em contato com a Pitzi (seguradora parceira), n├úo com a Velotax.</p>
          <ul class="bullet-list">
            <li>A Pitzi ├® respons├ível por analisar o sinistro</li>
            <li>A Pitzi autoriza a reposi├º├úo ou reparo do aparelho</li>
            <li>Velotax n├úo participa do processo de an├ílise</li>
          </ul>
          <div class="contact-box">
            <h3>­ƒô× Contato da Pitzi (Seguradora)</h3>
            <div class="contact-item"><strong>Telefone:</strong> 11 2579-0068 (seg-sex, 9h ├ás 18h)</div>
            <div class="contact-item"><strong>WhatsApp:</strong> 11 3777-0435 (seg-sex, 9h ├ás 20h; s├íbados, 9h ├ás 15h)</div>
            <div class="contact-item"><strong>Chat:</strong> dispon├¡vel seg-sex, 9h ├ás 20h</div>
            <div class="contact-item"><strong>Site:</strong> Pitzi.com.br</div>
          </div>
        </div>
      </div>
    `,
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    _id: 'artigo-seguro-divida-zero',
    title: 'Seguro D├¡vida Zero Velotax',
    category: 'Seguros',
    tag: 'Seguro D├¡vida Zero',
    description: 'A prote├º├úo financeira que garante suas contas em dia',
    content: `
      <div class="artigo-html-content">
        <div class="section">
          <h2>O Que ├® o Seguro D├¡vida Zero?</h2>
          <p class="section-intro">
            O Seguro D├¡vida Zero (Perda de Renda) ├® um seguro que te ajuda a pagar suas d├¡vidas (como parcelas de empr├®stimo ou cart├úo de cr├®dito) se voc├¬, profissional CLT, perder involuntariamente a sua fonte de renda. Ele garante o pagamento de uma indeniza├º├úo em caso de <strong>desemprego involunt├írio</strong> e oferece um valor di├írio em caso de <strong>incapacidade tempor├íria por acidente.</strong>
          </p>
          <div class="highlight-box">
            <h3>Benef├¡cios Adicionais</h3>
            <ul class="bullet-list">
              <li><strong>Assist├¬ncias</strong> que ajudam o cliente em um momento sens├¡vel, como a <strong>orienta├º├úo psicol├│gica.</strong></li>
              <li>Possibilidade de ganhar um <strong>sorteio mensal de R$ 10 mil</strong> em dinheiro.</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>Caracter├¡sticas e Como Funciona</h2>
          <div class="two-column">
            <div class="column">
              <h3>Caracter├¡sticas do Produto</h3>
              <ul class="bullet-list">
                <li><strong>Ades├úo:</strong> Facultativa ao seguro.</li>
                <li><strong>Processo:</strong> Contrata├º├úo <strong>100% online</strong>, sem complica├º├Áes.</li>
                <li><strong>Valor:</strong> <strong>R$ 29,90 por m├¬s</strong> (plano ├║nico).</li>
                <li><strong>P├║blico-Alvo:</strong> Clientes Velotax, preferencialmente com v├¡nculo CLT e/ou que buscam prote├º├úo contra perda de renda.</li>
                <li><strong>Vig├¬ncia:</strong> A partir de 01/12/2025, sem t├®rmino previsto.</li>
                <li><strong>Regi├úo Participante:</strong> N├¡vel nacional.</li>
              </ul>
            </div>
            <div class="column">
              <h3>Jornada de Contrata├º├úo</h3>
              <ul class="bullet-list">
                <li>O cliente acessa a aba <strong>"Seguros"</strong> na home do App Velotax e clica em <strong>"Simular agora"</strong> no card do Seguro D├¡vida Zero.</li>
                <li>Visualiza a descri├º├úo das coberturas e assist├¬ncias (plano ├║nico de R$ 29,90/m├¬s).</li>
                <li>Escolhe o <strong>Plano/Forma de Pagamento</strong> (Mensal, Anual ├á vista ou Anual parcelado em at├® 12x).</li>
                <li>Seleciona a modalidade de pagamento (<strong>Pix ou Cart├úo de cr├®dito</strong>).</li>
                <li>Preenche os dados e realiza o pagamento.</li>
                <li>Recebe a tela <strong>"Parab├®ns pela contrata├º├úo"</strong>. A ap├│lice pode ser consultada no menu "Seguros".</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Coberturas e Assist├¬ncias</h2>
          <div class="two-column">
            <div class="column">
              <h3>A. Desemprego Involunt├írio (Perda de Renda)</h3>
              <ul class="bullet-list">
                <li><strong>O que cobre:</strong> Indeniza├º├úo caso o Segurado (regido pela CLT) perca involuntariamente o v├¡nculo empregat├¡cio (sem justa causa).</li>
                <li><strong>Capital Segurado:</strong> Cobre at├® <strong>6 parcelas de R$1.000,00</strong> cada, totalizando <strong>R$6.000,00.</strong></li>
                <li><strong>Car├¬ncia:</strong> <strong>31 dias</strong> (a partir da vig├¬ncia do seguro).</li>
                <li><strong>Franquia:</strong> <strong>31 dias</strong> consecutivos (a partir do in├¡cio do desemprego).</li>
              </ul>
            </div>
            <div class="column">
              <h3>B. Incapacidade Tempor├íria por Acidente Pessoal (DIT-AP)</h3>
              <ul class="bullet-list">
                <li><strong>O que cobre:</strong> Pagamento de di├írias ao segurado durante o per├¡odo de incapacidade cont├¡nua e ininterrupta causada por um acidente que o impe├ºa de trabalhar.</li>
                <li><strong>Capital Segurado:</strong> Cobre no m├íximo <strong>90 di├írias de at├® R$200,00</strong> cada.</li>
                <li><strong>Car├¬ncia:</strong> N├úo se aplica.</li>
                <li><strong>Franquia:</strong> <strong>15 dias</strong> (a partir da data de afastamento).</li>
              </ul>
            </div>
          </div>
          <h3>Assist├¬ncias Adicionais</h3>
          <ul class="bullet-list">
            <li><strong>Sorteio:</strong> 1 Sorteio mensal em dinheiro de <strong>R$10 mil</strong> (valor bruto de IR), realizado no ├║ltimo s├íbado de cada m├¬s.</li>
            <li><strong>Orienta├º├úo Psicol├│gica:</strong> Assist├¬ncia que oferece orienta├º├úo psicol├│gica preliminar, b├ísica e preventiva por meio de contato telef├┤nico com psic├│logos.</li>
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
                    <li>Fornecer informa├º├Áes sobre as caracter├¡sticas do produto.</li>
                    <li>Sanar d├║vidas sobre o produto (como acionar o sinistro junto ao parceiro Sabemi).</li>
                    <li>Abrir chamados para tratativas internas em caso de contesta├º├Áes/reclama├º├Áes.</li>
                  </ul>
                </li>
                <li><strong>Canais:</strong> Fale Conosco (3003 7293 / 0800 800 0049) e Chat aplicativo Velotax.</li>
              </ul>
            </div>
            <div class="column">
              <h3>Atendimento Sabemi (Sinistros e Assuntos Gerais)</h3>
              <ul class="bullet-list">
                <li><strong>Atendimentos em geral, d├║vidas, sinistros e outros assuntos:</strong> 0800 880 1900 e WhatsApp (51) 9 9528-0140.</li>
                <li><strong>Orienta├º├úo Psicol├│gica:</strong> 0800 775 1911.</li>
                <li><strong>Importante:</strong> Em caso de acionamento do seguro (sinistro), o caso deve ser tratado <strong>direto pelo parceiro/seguradora Sabemi</strong> para fins de regula├º├úo e acompanhamento.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    createdAt: new Date('2025-12-01').toISOString(),
  },
];

