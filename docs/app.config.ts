export default defineAppConfig({
  docus: {
    title: 'Nuxt A/B Testing',
    description: 'Nuxt module designed to seamlessly integrate A/B testing.',
    socials: {
      github: 'mateuszkulpa/nuxt-ab-testing',
      nuxt: {
        label: 'Nuxt',
        icon: 'simple-icons:nuxtdotjs',
        href: 'https://nuxt.com',
      },
    },
    github: {
      dir: 'docs/content',
      branch: 'main',
      repo: 'nuxt-ab-testing',
      owner: 'mateuszkulpa',
      edit: true,
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: [],
    },
    main: {
      padded: true,
      fluid: true,
    },
    header: {
      // update when logo is ready
      logo: false,
      showLinkIcon: true,
      exclude: [],
      fluid: true,
    },
  },
})
