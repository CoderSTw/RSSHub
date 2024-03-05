// @ts-nocheck
import { getCurrentPath } from '@/utils/helpers';
const __dirname = getCurrentPath(import.meta.url);

import cache from '@/utils/cache';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';
import timezone from '@/utils/timezone';
import { art } from '@/utils/render';
import * as path from 'node:path';

export default async (ctx) => {
    const url = 'https://zw.cdzjryb.com/lottery/accept/projectList';
    const { data: response } = await got(url);
    const $ = load(response);

    const list = $('#_projectInfo tr')
        .toArray()
        .map((item) =>
            $(item)
                .find('td')
                .toArray()
                .map((td) => $(td).text().trim())
        );

    const items = await Promise.all(
        list.map((item) =>
            cache.tryGet(`cdzjryb:zw:projectList${item[0]}`, async () => {
                const { data: notice } = await got.post('https://zw.cdzjryb.com/lottery/accept/getProjectRule', {
                    form: {
                        projectUuid: item[0],
                    },
                });
                return {
                    title: item[3],
                    description: art(path.join(__dirname, 'templates/projectList.art'), {
                        item,
                        notice: notice.message,
                    }),
                    link: url,
                    guid: `cdzjryb:zw:projectList:${item[0]}`,
                    pubDate: timezone(parseDate(item[8]), 8),
                };
            })
        )
    );

    ctx.set('data', {
        title: $('head title').text(),
        link: url,
        item: items,
    });
};
