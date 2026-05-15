import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteConfig",
  title: "Configurações do Site",
  type: "document",
  fields: [
    defineField({
      name: "nomeInstituicao",
      title: "Nome da Instituição",
      type: "string",
      initialValue: "Cebees",
    }),
    defineField({
      name: "logo",
      title: "Logo Principal (horizontal colorida)",
      description: "Logo horizontal colorida — usada no header, footer e Open Graph.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoIcone",
      title: "Ícone / Escudo (favicon)",
      description: "Apenas o escudo — usado como ícone do site (favicon).",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoVertical",
      title: "Logo Vertical",
      description: "Versão vertical da logo — escudo + CEBEES empilhados.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoSimbolo",
      title: "Símbolo / Monograma",
      description: "Símbolo sem escudo — versão alternativa da logo.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "telefone",
      title: "Telefone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
    }),
    defineField({
      name: "endereco",
      title: "Endereço",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "instagram",
      title: "Instagram (URL)",
      type: "url",
    }),
    defineField({
      name: "facebook",
      title: "Facebook (URL)",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn (URL)",
      type: "url",
    }),
    defineField({
      name: "imagemFoco",
      title: 'Imagem — Seção "Nosso Foco"',
      description: "Substitui o bloco verde decorativo na seção Nosso Foco da Home.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagemCursos",
      title: 'Imagem — Seção "Cursos Livres"',
      description: "Substitui o bloco verde decorativo na seção Cursos Livres da Home.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Configurações do Site" }) },
});
