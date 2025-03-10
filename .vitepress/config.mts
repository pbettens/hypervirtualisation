import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hypervirtualisation",
  description: "Notes de cours",
  lang: 'fr-be',
  base: '/hypervirtualisation',
  srcDir: './src',
  outDir: './public',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/home' },
      { text: 'Cours', link: '/' }
    ],

    sidebar: [
      {
        text: 'Cours',
        items: [
          { text: 'Virtualisation', link: '/virtualisation' },
          { text: 'Réseau', link: '/reseaux' },
          { text: 'Stockage', link:  '/stockage'},
          { text: 'Conteneurisation', link: '/conteneurisation'},
          { text: 'Automatisation (Ansible)', link: '/ansible'}
        ]
      },
      {
        text: 'Ressources',
        items: [
            { text: 'Outils', link : '/outils'},
            { text: 'Bridge', link: '/bridge'},
            { text: 'LVM', link: '/lvm'},
            { text: 'NFS', link: '/nfs'},
            { text: 'iSCI', link: '/isci'},
            { text: 'Docker', link: '/docker'}
        ]
      },
      {
        text: '…',
        items: [
            { text: 'Organisation', link: '/organisation'},
            { text: 'Sources', link: '/sources'}
        ]
      }
    ],

    socialLinks: [
        { icon: 'github', link: 'https://github.com/pbettens/hypervirtualisation' }
    ],

    lastUpdated: {
      text: "Mise à jour le",
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    },

    footer: {
        copyright: 'CC-BY 2025 ♥'
    },

    search: {
        provider: 'local'
    }
  },
  markdown: {
      container: {
        tipLabel: 'ASTUCE',
        warningLabel: 'REMARQUE',
        dangerLabel: 'ATTENTION',
        infoLabel: 'INFO',
        detailsLabel: 'Détails ⬇'
      },
      config: (md) => {
        md.use(footnote)
      }
  }
})
