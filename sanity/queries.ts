import { groq } from "next-sanity";

export const cursosLivresQuery = groq`
  *[_type == "cursoLivre"] | order(_createdAt asc) {
    _id, titulo, slug, descricao, categoria, cargaHoraria, modalidade,
    preco, inscricoesAbertas, destaque,
    imagem { asset->{ url } }
  }
`;

export const cursosLivresDestaqueQuery = groq`
  *[_type == "cursoLivre" && destaque == true] | order(_createdAt asc)[0...4] {
    _id, titulo, slug, descricao, categoria, cargaHoraria, modalidade,
    preco, inscricoesAbertas,
    imagem { asset->{ url } }
  }
`;

export const cursoLivreBySlugQuery = groq`
  *[_type == "cursoLivre" && slug.current == $slug][0] {
    _id, titulo, slug, descricao, categoria, cargaHoraria, modalidade,
    preco, linkInscricao, inscricoesAbertas,
    imagem { asset->{ url } },
    sobreCurso,
    modulosCurso[] {
      titulo, descricao, topicos
    },
    professores[] {
      nome, cargo, bio,
      foto { asset->{ url } }
    }
  }
`;

export const posGraduacoesQuery = groq`
  *[_type == "posGraduacao"] | order(_createdAt desc) {
    _id, titulo, slug, descricao, duracao, modalidade, area, coordenador,
    inscricoesAbertas, destaque,
    imagem { asset->{ url } }
  }
`;

export const posGraduacoesDestaqueQuery = groq`
  *[_type == "posGraduacao" && destaque == true] | order(_createdAt desc)[0...4] {
    _id, titulo, slug, descricao, duracao, modalidade, area, inscricoesAbertas,
    imagem { asset->{ url } }
  }
`;

export const posGraduacaoBySlugQuery = groq`
  *[_type == "posGraduacao" && slug.current == $slug][0] {
    _id, titulo, slug, descricao, duracao, modalidade, area, coordenador,
    inscricoesAbertas,
    imagem { asset->{ url } }
  }
`;

export const paginaSobreQuery = groq`
  *[_type == "paginaSobre"][0] {
    missao, visao, valores, historia,
    equipe[] { nome, cargo, foto { asset->{ url } } }
  }
`;

export const siteConfigQuery = groq`
  *[_type == "siteConfig"][0] {
    nomeInstituicao, telefone, email, endereco, instagram, facebook, linkedin,
    logo { asset->{ url } },
    imagemFoco { asset->{ url } },
    imagemCursos { asset->{ url } }
  }
`;

export const bannersQuery = groq`
  *[_type == "bannerConfig" && ativo == true] | order(_createdAt asc) {
    _id, titulo, subtitulo,
    imagem { asset->{ url } },
    ctaPrimario { label, url },
    ctaSecundario { label, url }
  }
`;
