export default {
    'dlsite.com': {
        _name: 'DLsite',
        '.': [
            {
                title: '通用',
                docs: 'https://docs.rsshub.app/routes/anime#dlsite',
                source: ['/'],
                target: (params, url) => `/dlsite${new URL(url).href.match(/dlsite\.com\/(.*?)/)[1]}`,
            },
            {
                title: '当前日期发售的新产品',
                docs: 'https://docs.rsshub.app/routes/anime#dlsite',
            },
            {
                title: '产品打折信息',
                docs: 'https://docs.rsshub.app/routes/anime#dlsite',
            },
        ],
        'ci-en': [
            {
                title: 'Ci-en 创作者文章',
                docs: 'https://docs.rsshub.app/routes/anime#dlsite',
                source: ['/creator/:id/article/843558', '/'],
                target: '/dlsite/ci-en/:id/article',
            },
        ],
    },
};
