import { defineField, defineType } from "sanity";

export default defineType({
  name: "paginaSobre",
  title: "Página Sobre",
  type: "document",
  fields: [
    defineField({
      name: "missao",
      title: "Missão",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "visao",
      title: "Visão",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "valores",
      title: "Valores",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "historia",
      title: "Nossa História",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "equipe",
      title: "Equipe",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "nome", title: "Nome", type: "string" },
            { name: "cargo", title: "Cargo", type: "string" },
            {
              name: "foto",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: { select: { title: "nome", subtitle: "cargo", media: "foto" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Página Sobre" }) },
});
