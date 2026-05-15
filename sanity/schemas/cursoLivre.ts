import { defineField, defineType } from "sanity";

export default defineType({
  name: "cursoLivre",
  title: "Curso Livre",
  type: "document",
  groups: [
    { name: "info", title: "Informações Gerais" },
    { name: "conteudo", title: "Conteúdo" },
    { name: "professores", title: "Professores" },
    { name: "comercial", title: "Comercial" },
  ],
  fields: [
    /* ── Informações Gerais ─────────────────────────────── */
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      group: "info",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "info",
      options: { source: "titulo" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "string",
      group: "info",
      options: {
        list: ["Treinamento", "Fisiculturismo", "Saúde", "Carreiras"],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição curta",
      description: "Aparece nos cards de listagem (1–2 frases)",
      type: "text",
      rows: 3,
      group: "info",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "imagem",
      title: "Imagem de Capa",
      type: "image",
      group: "info",
      options: { hotspot: true },
    }),
    defineField({
      name: "modalidade",
      title: "Modalidade",
      type: "string",
      group: "info",
      options: {
        list: ["Presencial", "Online", "Híbrido"],
        layout: "radio",
      },
      initialValue: "Online",
    }),
    defineField({
      name: "cargaHoraria",
      title: "Carga Horária",
      type: "string",
      group: "info",
      placeholder: "Ex: 40h",
    }),

    /* ── Conteúdo ────────────────────────────────────────── */
    defineField({
      name: "sobreCurso",
      title: "Sobre o Curso",
      description: "Texto completo exibido na página do curso",
      type: "array",
      group: "conteudo",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "modulosCurso",
      title: "Grade / Módulos",
      description: "Lista de módulos ou tópicos do curso",
      type: "array",
      group: "conteudo",
      of: [
        {
          type: "object",
          name: "modulo",
          title: "Módulo",
          fields: [
            defineField({ name: "titulo", title: "Título do Módulo", type: "string", validation: (r) => r.required() }),
            defineField({ name: "descricao", title: "Descrição (opcional)", type: "text", rows: 2 }),
            defineField({
              name: "topicos",
              title: "Tópicos",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { title: "titulo", subtitle: "descricao" },
          },
        },
      ],
    }),

    /* ── Professores ─────────────────────────────────────── */
    defineField({
      name: "professores",
      title: "Professores",
      type: "array",
      group: "professores",
      of: [
        {
          type: "object",
          name: "professor",
          title: "Professor",
          fields: [
            defineField({ name: "nome", title: "Nome", type: "string", validation: (r) => r.required() }),
            defineField({ name: "cargo", title: "Cargo / Título", type: "string" }),
            defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
            defineField({
              name: "foto",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "nome", subtitle: "cargo", media: "foto" },
          },
        },
      ],
    }),

    /* ── Comercial ───────────────────────────────────────── */
    defineField({
      name: "preco",
      title: "Preço (R$)",
      description: "Deixe em branco se o preço for sob consulta",
      type: "number",
      group: "comercial",
    }),
    defineField({
      name: "linkInscricao",
      title: "Link de Inscrição",
      description: "URL para onde o botão de inscrição irá apontar",
      type: "url",
      group: "comercial",
      placeholder: "https://cebees.memberclass.com.br/...",
    }),
    defineField({
      name: "inscricoesAbertas",
      title: "Inscrições Abertas",
      type: "boolean",
      group: "comercial",
      initialValue: true,
    }),
    defineField({
      name: "destaque",
      title: "Exibir em Destaque na Home",
      type: "boolean",
      group: "comercial",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "titulo", media: "imagem", subtitle: "categoria" },
  },
});
