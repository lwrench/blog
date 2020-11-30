module.exports = {
  title: "滥觞",
  description: "江河之远，始于滥觞",
  base: "/blog/",
  dest:'./dist',
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        href: "/Blog.png",
      },
    ],
  ],
  evergreen: true,
  theme: "reco",
  themeConfig: {
    type: "blog",
    codeTheme: "tomorrow",
    smoothScroll: true, //平滑滚动
    backToTop: true,
    nav: [
      {
        text: "学习笔记",
        items: [
          { text: "git", link: "/studyBlog/git/"},
          { text: "vue", link: "/studyBlog/vue/" },
          { text: "react", link: "/studyBlog/react/"},
        ],
        icon: "reco-coding",
      },
      { text: "TimeLine", link: "/timeline/", icon: "reco-date" },
      {
        text: "About Me",
        link: "/aboutMe/",
        icon: "reco-suggestion",
      },
      {
        text: "Contact",
        items: [
          {
            text: "Github",
            link: "https://github.com/lwrench",
            icon: "reco-github",
          },
          {
            text: "Gitee",
            link: "https://gitee.com/lwrench",
            icon: "reco-mayun",
          },
        ],
      },
    ],
    // 博客配置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "文章分类", // 默认文案 “分类”
      },
    },
  },
  markdown: {
    lineNumbers: true,
  },
};
