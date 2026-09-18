import { createFileRoute } from "@tanstack/react-router";
import {
  Accessibility, Apple, Award, CalendarDays, Check, ChevronDown, Clock3,
  Download, Droplets, ExternalLink, FileText, HeartPulse, MapPin, Medal,
  PackageCheck, Route as RouteIcon, ShieldCheck, Shirt, Sparkles, Trophy,
  Users, UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "@/data/content.json";
import headerAsset from "@/assets/header.jpg.asset.json";
import footerAsset from "@/assets/footer.jpg.asset.json";
import pdfAsset from "@/assets/regulamento-2a-corrida-fisio-to.pdf.asset.json";
import raceImage from "@/assets/camburi-road-race.jpg";
import walkImage from "@/assets/community-walk.jpg";

type Modalidade = { nome: string; distanciaKm: number; carater: string; aquecimento: string; largada: string };
type Cronograma = { horario: string; atividade: string };
type BotaoInscricao = { id: string; rotulo: string; publico: string; urlGoogleForms: string; requisitoAdicional: string | null };
type Categoria = { nome: string; colocacoes: string[]; observacao?: string };
type EventContent = {
  evento: { nome: string; organizador: string; organizadorNomeCompleto: string; slogan: string; campanhaTema: string; data: string; dataISO: string; local: string; pontoConcentracao: string; duracaoMaximaMinutos: number; gratuita: boolean };
  modalidades: Modalidade[];
  cronograma: Cronograma[];
  elegibilidade: { idadeMinima: number; publico: string; observacao: string };
  inscricao: { gratuita: boolean; prazoFinal: string; observacaoPrazo: string; unicaPessoalIntransferivel: boolean; doacao: { obrigatoria: boolean; quantidade: string; quando: string; destino: string; baseLegal: string; condicoes: string }; botoes: BotaoInscricao[] };
  kitParticipacao: { itens: string[]; observacoes: string[] };
  premiacao: { modalidadePremiada: string; totalTrofeus: number; categorias: Categoria[]; observacaoCaminhada: string };
  cronometragem: { sistema: string; obrigatorio: boolean; posicaoNumeroPeito: string };
  estruturaApoio: string[];
  regrasGerais: string[];
  condicoesEvento: { podeAlterar: boolean; motivosAlteracao: string[]; comunicacaoOficial: string };
  direitosImagemLGPD: { autorizacaoImagem: string; lgpd: string };
  termoResponsabilidade: { obrigatorio: boolean; descricao: string };
  cta: { baixarRegulamento: { rotulo: string; arquivo: string } };
  identidadeVisual: { headerImagem: string; footerImagem: string; cores: Record<string, string> };
  contato: { canaisOficiais: string; observacao: string };
};

const content = data as EventContent;
const nav = [
  ["Sobre", "sobre"], ["Modalidades", "modalidades"], ["Inscrição", "inscricao"],
  ["Kit", "kit"], ["Premiação", "premiacao"], ["Regulamento", "regulamento"],
];
const supportIcons = [Droplets, HeartPulse, ShieldCheck, PackageCheck, Accessibility];
const kitIcons = [FileText, PackageCheck, Shirt, PackageCheck, UtensilsCrossed, Medal, Sparkles];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: `${content.evento.nome} | ${content.evento.organizador}` },
    { name: "description", content: `${content.evento.nome}, em ${content.evento.data}, na ${content.evento.local}.` },
    { property: "og:title", content: `${content.evento.nome} | ${content.evento.organizador}` },
    { property: "og:description", content: `${content.evento.data} — ${content.evento.local}.` },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: EventPage,
});

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <div className="section-heading"><span>{eyebrow}</span><h2>{title}</h2>{intro && <p>{intro}</p>}</div>;
}

function EventPage() {
  return (
    <main>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <img src={headerAsset.url} alt={`${content.evento.nome} — ${content.evento.organizador}`} width="1600" height="326" />
        <nav aria-label="Navegação principal">
          <div className="nav-inner">
            <a className="nav-brand" href="#topo">FISIO<span>&</span>TO</a>
            <div className="nav-links">{nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
            <a className="nav-cta" href="#inscricao">Inscreva-se</a>
          </div>
        </nav>
      </header>

      <section id="topo" className="hero">
        <img src={raceImage} alt="Grupo diverso correndo à beira-mar" width="1600" height="1008" />
        <div className="hero-shade" />
        <div className="hero-content" id="conteudo">
          {content.evento.gratuita && <span className="hero-badge">Inscrição gratuita</span>}
          <p className="hero-kicker">{content.evento.campanhaTema}</p>
          <h1>{content.evento.nome}</h1>
          <div className="hero-facts">
            <span><CalendarDays aria-hidden="true" />{content.evento.data}</span>
            <span><MapPin aria-hidden="true" />{content.evento.local}</span>
          </div>
          <Button asChild size="lg"><a href="#inscricao">Quero participar <ChevronDown aria-hidden="true" /></a></Button>
        </div>
      </section>

      <section id="sobre" className="section section-about">
        <div className="container about-grid">
          <div>
            <SectionHeading eyebrow={content.evento.organizador} title="Movimento que transforma" />
            <p className="lead">Uma iniciativa do {content.evento.organizadorNomeCompleto}.</p>
            <div className="info-stack">
              <div><MapPin /><span><small>Concentração</small>{content.evento.pontoConcentracao}</span></div>
              <div><Clock3 /><span><small>Duração máxima</small>{content.evento.duracaoMaximaMinutos} minutos</span></div>
            </div>
          </div>
          <figure><img src={walkImage} alt="Comunidade caminhando ao ar livre junto à praia" loading="lazy" width="1200" height="912" /><figcaption>{content.evento.slogan}</figcaption></figure>
        </div>
      </section>

      <section id="modalidades" className="section section-modes">
        <div className="container">
          <SectionHeading eyebrow="Escolha seu ritmo" title="Duas modalidades, uma mesma energia" />
          <div className="mode-grid">
            {content.modalidades.map((mode, index) => <article className="mode-card" key={mode.nome}>
              <div className="mode-number">0{index + 1}</div>
              <RouteIcon aria-hidden="true" />
              <h3>{mode.nome}</h3>
              <strong>{mode.distanciaKm}<small> km</small></strong>
              <p>{mode.carater}</p>
              <dl><div><dt>Aquecimento</dt><dd>{mode.aquecimento}</dd></div><div><dt>Largada</dt><dd>{mode.largada}</dd></div></dl>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section schedule-section">
        <div className="container">
          <SectionHeading eyebrow="11 de outubro" title="Cronograma do dia" />
          <ol className="timeline">{content.cronograma.map((item, i) => <li key={item.horario}><span>0{i + 1}</span><time>{item.horario}</time><p>{item.atividade}</p></li>)}</ol>
        </div>
      </section>

      <section className="section eligibility-section">
        <div className="container eligibility-grid">
          <SectionHeading eyebrow="Participação" title="Quem pode participar" />
          <div className="eligibility-cards">
            <article><Users /><strong>{content.elegibilidade.idadeMinima}+</strong><p>Idade mínima</p></article>
            <article><HeartPulse /><strong>Fisio & TO</strong><p>{content.elegibilidade.publico}</p></article>
            <article><FileText /><strong>Estudantes</strong><p>{content.elegibilidade.observacao}</p></article>
          </div>
        </div>
      </section>

      <section id="inscricao" className="section signup-section">
        <div className="container signup-grid">
          <div>
            <SectionHeading eyebrow="Inscrição gratuita" title="Garanta sua participação" />
            <div className="deadline"><CalendarDays /><span><small>Inscrições até</small>{content.inscricao.prazoFinal}</span></div>
            <p>{content.inscricao.observacaoPrazo}</p>
            <p>{content.inscricao.unicaPessoalIntransferivel && "A inscrição é única, pessoal e intransferível."}</p>
          </div>
          <aside className="donation">
            <Apple aria-hidden="true" /><div><span>Contrapartida social</span><h3>{content.inscricao.doacao.quantidade}</h3><p>Entrega {content.inscricao.doacao.quando}, com destino ao {content.inscricao.doacao.destino}.</p><small>{content.inscricao.doacao.condicoes} {content.inscricao.doacao.baseLegal}.</small></div>
          </aside>
        </div>
        <div className="container signup-actions">
          {content.inscricao.botoes.map((item, index) => <article key={item.id}>
            <div><span>{index === 0 ? "Para quem está estudando" : "Para quem já é profissional"}</span><h3>{item.rotulo}</h3><p>{item.publico}</p>{item.requisitoAdicional && <small>{item.requisitoAdicional}</small>}</div>
            <Button asChild size="lg" variant={index === 0 ? "secondary" : "primary"}><a href={item.urlGoogleForms} target="_blank" rel="noreferrer">Fazer inscrição <ExternalLink /></a></Button>
          </article>)}
        </div>
      </section>

      <section id="kit" className="section kit-section">
        <div className="container">
          <SectionHeading eyebrow="Experiência completa" title="Kit do participante" />
          <div className="kit-grid">{content.kitParticipacao.itens.map((item, i) => { const Icon = kitIcons[i] ?? Check; return <div key={item}><Icon /><span>{item}</span></div>; })}</div>
          <div className="notes">{content.kitParticipacao.observacoes.map(note => <p key={note}><Check />{note}</p>)}</div>
        </div>
      </section>

      <section id="premiacao" className="section awards-section">
        <div className="container">
          <div className="awards-head"><SectionHeading eyebrow={content.premiacao.modalidadePremiada} title="Premiação" /><div><Trophy /><strong>{content.premiacao.totalTrofeus}</strong><span>troféus</span></div></div>
          <div className="awards-grid">{content.premiacao.categorias.map(category => <article key={category.nome}><Award /><h3>{category.nome}</h3><div>{category.colocacoes.map(place => <span key={place}>{place}</span>)}</div>{category.observacao && <p>{category.observacao}</p>}</article>)}</div>
          <p className="award-note">{content.premiacao.observacaoCaminhada}</p>
        </div>
      </section>

      <section className="section support-section">
        <div className="container"><SectionHeading eyebrow="Durante todo o percurso" title="Estrutura de apoio" /><div className="support-grid">{content.estruturaApoio.map((item, i) => { const Icon = supportIcons[i] ?? ShieldCheck; return <div key={item}><Icon /><p>{item}</p></div>; })}</div></div>
      </section>

      <section id="regulamento" className="section rules-section">
        <div className="container rules-grid">
          <div className="download-panel"><FileText /><span>Documento oficial</span><h2>Regulamento completo</h2><p>A participação no evento segue todas as disposições do regulamento oficial.</p><Button asChild size="lg" variant="outline"><a href={pdfAsset.url} download="regulamento-2a-corrida-fisio-to.pdf"><Download />{content.cta.baixarRegulamento.rotulo}</a></Button></div>
          <div><SectionHeading eyebrow="Leia antes de participar" title="Regras gerais rápidas" /><ul className="rules-list">{content.regrasGerais.map(rule => <li key={rule}><Check />{rule}</li>)}</ul><div className="chip-note"><ShieldCheck /><p><strong>{content.cronometragem.sistema}</strong><br />{content.cronometragem.posicaoNumeroPeito}</p></div></div>
        </div>
      </section>

      <section className="section notices-section">
        <div className="container"><SectionHeading eyebrow="FAQ" title="Avisos importantes" /><div className="notices-grid">
          <details open><summary>O evento pode sofrer alterações?</summary><p>Sim. {content.condicoesEvento.motivosAlteracao.join(", ")}. A comunicação será feita pelos {content.condicoesEvento.comunicacaoOficial}.</p></details>
          <details><summary>É obrigatório aceitar o Termo de Responsabilidade?</summary><p>{content.termoResponsabilidade.descricao}</p></details>
          <details><summary>Onde acompanho as próximas informações?</summary><p>{content.contato.observacao} Consulte os {content.contato.canaisOficiais}.</p></details>
        </div></div>
      </section>

      <footer>
        <img src={footerAsset.url} alt={`${content.evento.slogan} — Sistema CREFITO-15 e Run Therapy`} loading="lazy" width="1600" height="347" />
        <div className="footer-bottom"><strong>{content.evento.organizadorNomeCompleto}</strong><p>{content.direitosImagemLGPD.autorizacaoImagem}</p><p>{content.direitosImagemLGPD.lgpd}</p><small>© 2026 {content.evento.organizador}. Todos os direitos reservados.</small></div>
      </footer>
    </main>
  );
}
