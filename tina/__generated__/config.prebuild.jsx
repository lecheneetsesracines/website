// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local",
  token: process.env.TINA_TOKEN || "local",
  build: {
    outputFolder: "tina",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images/sections",
      publicFolder: "src"
    }
  },
  schema: {
    collections: [
      {
        name: "section",
        label: "Sections",
        path: "content/sections",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Titre",
            type: "string",
            isTitle: true,
            required: true
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
            required: true
          },
          {
            name: "description",
            label: "Description",
            type: "string"
          },
          {
            name: "gallery",
            label: "Images",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.alt || item?.imageId || "Image"
              })
            },
            fields: [
              {
                name: "imageId",
                label: "Identifiant d'image",
                type: "string",
                required: true,
                description: "Identifiant correspondant \xE0 une image d\xE9clar\xE9e dans le code (ex: 'parentalite')."
              },
              {
                name: "alt",
                label: "Texte alternatif",
                type: "string"
              }
            ]
          },
          {
            name: "body",
            label: "Contenu",
            type: "rich-text",
            isBody: true
          }
        ]
      },
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        templates: [
          {
            name: "home",
            label: "Accueil",
            fields: [
              {
                name: "slug",
                label: "Slug",
                type: "string",
                required: true
              },
              {
                name: "title",
                label: "Titre",
                type: "string",
                required: true
              },
              {
                name: "heroTitle",
                label: "Titre du h\xE9ros",
                type: "string",
                required: true
              },
              {
                name: "heroDescription",
                label: "Texte du h\xE9ros",
                type: "string",
                ui: {
                  component: "textarea"
                }
              },
              {
                name: "contactHeading",
                label: "Titre du bloc contact",
                type: "string"
              },
              {
                name: "contactPhoneLabel",
                label: "T\xE9l\xE9phone (texte)",
                type: "string"
              },
              {
                name: "contactPhoneHref",
                label: "T\xE9l\xE9phone (lien)",
                type: "string"
              },
              {
                name: "contactEmailLabel",
                label: "Email (texte)",
                type: "string"
              },
              {
                name: "contactEmailHref",
                label: "Email (lien)",
                type: "string"
              },
              {
                name: "financeursIntro",
                label: "Texte financeurs",
                type: "string",
                ui: {
                  component: "textarea"
                }
              },
              {
                name: "body",
                label: "Contenu suppl\xE9mentaire",
                type: "rich-text",
                isBody: true
              }
            ]
          },
          {
            name: "contact",
            label: "Contact",
            fields: [
              {
                name: "slug",
                label: "Slug",
                type: "string",
                required: true
              },
              {
                name: "title",
                label: "Titre",
                type: "string",
                required: true
              },
              {
                name: "address",
                label: "Adresse",
                type: "object",
                fields: [
                  {
                    name: "label",
                    label: "Texte",
                    type: "string",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    name: "href",
                    label: "Lien",
                    type: "string"
                  }
                ]
              },
              {
                name: "phone",
                label: "T\xE9l\xE9phone",
                type: "object",
                fields: [
                  {
                    name: "label",
                    label: "Texte",
                    type: "string"
                  },
                  {
                    name: "href",
                    label: "Lien",
                    type: "string"
                  }
                ]
              },
              {
                name: "email",
                label: "Email",
                type: "object",
                fields: [
                  {
                    name: "label",
                    label: "Texte",
                    type: "string"
                  },
                  {
                    name: "href",
                    label: "Lien",
                    type: "string"
                  }
                ]
              },
              {
                name: "infoBlocks",
                label: "Blocs d\u2019information",
                type: "object",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.heading || "Bloc"
                  })
                },
                fields: [
                  {
                    name: "heading",
                    label: "Titre",
                    type: "string"
                  },
                  {
                    name: "body",
                    label: "Texte",
                    type: "string",
                    ui: {
                      component: "textarea"
                    }
                  }
                ]
              },
              {
                name: "mapEmbedUrl",
                label: "URL de la carte int\xE9gr\xE9e",
                type: "string"
              },
              {
                name: "body",
                label: "Contenu suppl\xE9mentaire",
                type: "rich-text",
                isBody: true
              }
            ]
          },
          {
            name: "equipe",
            label: "\xC9quipe",
            fields: [
              {
                name: "slug",
                label: "Slug",
                type: "string",
                required: true
              },
              {
                name: "title",
                label: "Titre",
                type: "string",
                required: true
              },
              {
                name: "description",
                label: "Description",
                type: "string",
                ui: {
                  component: "textarea"
                }
              },
              {
                name: "people",
                label: "Membres",
                type: "object",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.name || "Membre"
                  })
                },
                fields: [
                  {
                    name: "name",
                    label: "Nom",
                    type: "string",
                    required: true
                  },
                  {
                    name: "role",
                    label: "R\xF4le",
                    type: "string"
                  },
                  {
                    name: "bio",
                    label: "Bio",
                    type: "string",
                    ui: {
                      component: "textarea"
                    }
                  }
                ]
              },
              {
                name: "body",
                label: "Contenu suppl\xE9mentaire",
                type: "rich-text",
                isBody: true
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
