import { defineField, defineType } from "sanity";

export default defineType({
  name: "posGraduacao",
  title: "Pós-Graduação",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titulo" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "area",
      title: "Área",
      type: "string",
      placeholder: "Ex: Gestão, Educação, Saúde...",
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imagem",
      title: "Imagem de Capa",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "duracao",
      title: "Duração",
      type: "string",
      placeholder: "Ex: 18 meses",
    }),
    defineField({
      name: "modalidade",
      title: "Modalidade",
      type: "string",
      options: {
        list: ["Presencial", "EAD", "Semipresencial"],
        layout: "radio",
      },
    }),
    defineField({
      name: "coordenador",
      title: "Coordenador(a)",
      type: "string",
    }),
    defineField({
      name: "inscricoesAbertas",
      title: "Inscrições Abertas",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "destaque",
      title: "Exibir em Destaque na Home",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "titulo", media: "imagem", subtitle: "area" },
  },
});
