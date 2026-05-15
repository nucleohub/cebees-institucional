import { defineField, defineType } from "sanity";

export default defineType({
  name: "bannerConfig",
  title: "Banner Principal",
  type: "document",
  fields: [
    defineField({ name: "titulo", title: "Título do Banner", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitulo", title: "Subtítulo", type: "text", rows: 2 }),
    defineField({ name: "imagem", title: "Imagem de Fundo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "ctaPrimario",
      title: "CTA Primário",
      type: "object",
      fields: [
        { name: "label", title: "Texto do botão", type: "string" },
        { name: "url", title: "URL", type: "string" },
      ],
    }),
    defineField({
      name: "ctaSecundario",
      title: "CTA Secundário",
      type: "object",
      fields: [
        { name: "label", title: "Texto do botão", type: "string" },
        { name: "url", title: "URL", type: "string" },
      ],
    }),
    defineField({ name: "ativo", title: "Exibir este banner", type: "boolean", initialValue: true }),
    defineField({
      name: "tipoCurso",
      title: "Tipo de Curso Destacado",
      type: "string",
      options: { list: ["Nenhum", "Curso Livre", "Tecnólogo", "Pós-Graduação"] },
    }),
  ],
  preview: { select: { title: "titulo", media: "imagem" } },
});
