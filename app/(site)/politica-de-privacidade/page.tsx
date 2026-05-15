import SectionLabel from "@/components/ui/SectionLabel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da CEBEES — como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.",
};

const secoes = [
  {
    titulo: "1. Quem somos",
    texto: `A CEBEES — Centro Brasileiro de Estudos Esportivos e Saúde é uma instituição de ensino dedicada à formação especializada nas áreas de saúde, esporte, performance e bem-estar. Esta Política de Privacidade descreve como tratamos os dados pessoais coletados em nosso site e plataforma de ensino.`,
  },
  {
    titulo: "2. Dados que coletamos",
    texto: `Podemos coletar os seguintes dados pessoais: nome completo, endereço de e-mail, número de telefone, dados de navegação (cookies, IP, páginas acessadas) e informações fornecidas ao se inscrever em cursos ou entrar em contato conosco. Não coletamos dados sensíveis sem consentimento expresso.`,
  },
  {
    titulo: "3. Finalidade do tratamento",
    texto: `Utilizamos seus dados para: processar inscrições em cursos e programas; enviar comunicações sobre conteúdos, novidades e ofertas da CEBEES (com opção de descadastro); responder solicitações de suporte e contato; melhorar a experiência de navegação e personalizar conteúdos; e cumprir obrigações legais e regulatórias.`,
  },
  {
    titulo: "4. Base legal",
    texto: `O tratamento de dados pela CEBEES fundamenta-se nas seguintes bases legais da Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018): consentimento do titular; execução de contrato ou procedimentos preliminares; cumprimento de obrigação legal; e legítimo interesse, sempre respeitando os direitos e liberdades fundamentais dos titulares.`,
  },
  {
    titulo: "5. Compartilhamento de dados",
    texto: `Não vendemos dados pessoais. Podemos compartilhar informações com: plataformas de pagamento para processamento de transações; ferramentas de e-mail marketing para envio de comunicações (mediante consentimento); e parceiros de tecnologia necessários para operação do site e da plataforma de ensino — todos sujeitos a obrigações de confidencialidade.`,
  },
  {
    titulo: "6. Cookies",
    texto: `Nosso site utiliza cookies para melhorar a experiência de navegação, analisar tráfego e personalizar conteúdo. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar funcionalidades do site. Ao continuar navegando, você consente com o uso de cookies essenciais.`,
  },
  {
    titulo: "7. Seus direitos (LGPD)",
    texto: `Como titular de dados, você tem o direito de: confirmar a existência de tratamento; acessar seus dados; corrigir dados incompletos ou desatualizados; solicitar a anonimização, bloqueio ou eliminação de dados desnecessários; revogar o consentimento a qualquer momento; e obter informações sobre compartilhamento. Para exercer esses direitos, entre em contato pelo e-mail cbmf.cursos@gmail.com.`,
  },
  {
    titulo: "8. Segurança",
    texto: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, alteração ou divulgação indevida. Nossos sistemas são mantidos com boas práticas de segurança da informação.`,
  },
  {
    titulo: "9. Retenção de dados",
    texto: `Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei. Após esse período, os dados são eliminados de forma segura.`,
  },
  {
    titulo: "10. Alterações nesta política",
    texto: `Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre disponível nesta página. Recomendamos que você a revise regularmente. Alterações significativas serão comunicadas por e-mail aos titulares cadastrados.`,
  },
  {
    titulo: "11. Contato e DPO",
    texto: `Para dúvidas, solicitações ou reclamações sobre o tratamento de seus dados pessoais, entre em contato pelo e-mail cbmf.cursos@gmail.com ou utilize nossa Ouvidoria. Faremos o possível para responder dentro de 15 dias úteis.`,
  },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="bg-[var(--color-bg)]">
      {/* Header */}
      <section className="py-14 border-b border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto max-w-3xl">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4 leading-tight">
            Política de Privacidade
          </h1>
          <p className="text-[var(--color-text-2)] text-base leading-relaxed">
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
            Última atualização: maio de 2026.
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-14">
        <div className="w-[90%] sm:w-[85%] mx-auto max-w-3xl">
          <div className="space-y-10">
            {secoes.map((s) => (
              <div key={s.titulo}>
                <h2 className="text-base font-black text-[var(--color-text)] mb-3">
                  {s.titulo}
                </h2>
                <p className="text-sm text-[var(--color-text-2)] leading-relaxed">
                  {s.texto}
                </p>
              </div>
            ))}
          </div>

          {/* Contato rápido */}
          <div className="mt-14 p-8 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl">
            <p className="text-sm font-bold text-[var(--color-text)] mb-1">
              Dúvidas sobre privacidade?
            </p>
            <p className="text-sm text-[var(--color-text-2)]">
              Entre em contato pelo e-mail{" "}
              <a
                href="mailto:cbmf.cursos@gmail.com"
                className="text-[var(--color-brand)] hover:underline font-medium"
              >
                cbmf.cursos@gmail.com
              </a>{" "}
              ou acesse nossa{" "}
              <a
                href="/ouvidoria"
                className="text-[var(--color-brand)] hover:underline font-medium"
              >
                Ouvidoria
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
