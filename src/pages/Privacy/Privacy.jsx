import './Privacy.css'

function Privacy() {
  return (
    <main className="privacy" aria-label="Política de Privacidade — AG Cortinas e Persianas">

      <div className="privacy-header">
        <span className="privacy-label">Legal</span>
        <h1 className="privacy-titulo">Política de Privacidade</h1>
        <p className="privacy-data">Última atualização: março de 2026</p>
      </div>

      <div className="privacy-content">

        <section className="privacy-section">
          <h2>1. Quem somos</h2>
          <p>
            A <strong>AG Cortinas e Persianas</strong> é uma empresa especializada em cortinas e persianas sob medida,
            localizada em Joinville — SC. Este documento descreve como coletamos, usamos e protegemos
            suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>
          <p>
            Em caso de dúvidas, entre em contato pelo e-mail{' '}
            <a href="mailto:agcortinasepersianas@gmail.com">agcortinasepersianas@gmail.com</a>.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Quais dados coletamos</h2>
          <p>Coletamos os seguintes dados quando você utiliza nosso site:</p>
          <ul>
            <li><strong>Dados de contato:</strong> nome, e-mail e telefone fornecidos no formulário de contato.</li>
            <li><strong>Dados de agendamento:</strong> nome, e-mail, telefone, endereço, data e horário preferidos para visita técnica.</li>
            <li><strong>Dados de navegação:</strong> cookies técnicos para funcionamento do site (somente se você aceitar).</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>3. Para que usamos seus dados</h2>
          <p>Seus dados são utilizados exclusivamente para:</p>
          <ul>
            <li>Responder sua mensagem de contato ou dúvida.</li>
            <li>Confirmar e organizar visitas técnicas agendadas.</li>
            <li>Enviar informações sobre orçamentos solicitados.</li>
            <li>Melhorar a experiência de navegação no site.</li>
          </ul>
          <p>
            Não utilizamos seus dados para envio de publicidade não solicitada (spam) nem os compartilhamos com terceiros para fins comerciais.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. Base legal para o tratamento</h2>
          <p>
            O tratamento dos seus dados é realizado com base no <strong>consentimento</strong> (Art. 7º, I da LGPD)
            e na <strong>execução de contrato ou procedimentos preliminares</strong> (Art. 7º, V da LGPD),
            quando você solicita um agendamento ou orçamento.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Cookies</h2>
          <p>
            Nosso site utiliza cookies técnicos essenciais para o funcionamento correto das páginas.
            Ao aceitar os cookies, você também permite a coleta de dados de navegação para melhoria
            da experiência no site.
          </p>
          <p>
            Você pode recusar os cookies a qualquer momento pelo banner exibido no site ou apagando
            os dados de navegação no seu navegador. A recusa de cookies não impede o uso do site.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. Por quanto tempo guardamos seus dados</h2>
          <p>
            Seus dados são mantidos pelo tempo necessário para atender à finalidade para a qual foram coletados:
          </p>
          <ul>
            <li>Mensagens de contato: até 12 meses após o atendimento.</li>
            <li>Agendamentos: até 24 meses após a realização da visita.</li>
          </ul>
          <p>
            Após esse prazo, os dados são apagados ou anonimizados.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Seus direitos como titular</h2>
          <p>De acordo com a LGPD, você tem direito a:</p>
          <ul>
            <li>Confirmar a existência de tratamento dos seus dados.</li>
            <li>Acessar os dados que temos sobre você.</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
            <li>Solicitar a exclusão dos seus dados.</li>
            <li>Revogar o consentimento a qualquer momento.</li>
            <li>Se opor ao tratamento realizado em desacordo com a lei.</li>
          </ul>
          <p>
            Para exercer qualquer um desses direitos, entre em contato pelo e-mail{' '}
            <a href="mailto:agcortinasepersianas@gmail.com">agcortinasepersianas@gmail.com</a>.
          </p>
        </section>

        <section className="privacy-section">
          <h2>8. Segurança dos dados</h2>
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra
            acesso não autorizado, perda ou destruição, incluindo uso de conexão segura (HTTPS)
            e armazenamento em banco de dados protegido por senha.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. Alterações nesta política</h2>
          <p>
            Esta política pode ser atualizada periodicamente. Sempre que houver mudanças relevantes,
            a data de "última atualização" no topo desta página será modificada.
            Recomendamos que você consulte esta página regularmente.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Contato</h2>
          <p>
            Dúvidas, solicitações ou reclamações relacionadas à privacidade e proteção de dados:
          </p>
          <ul>
            <li><strong>E-mail:</strong> <a href="mailto:agcortinasepersianas@gmail.com">agcortinasepersianas@gmail.com</a></li>
            <li><strong>Telefone:</strong> <a href="tel:+5547984211262">(47) 98421-1262</a></li>
          </ul>
        </section>

      </div>

    </main>
  )
}

export default Privacy
