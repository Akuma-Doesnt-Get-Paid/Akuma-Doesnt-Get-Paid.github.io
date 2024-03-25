/* global commands */
commands = {};

const CACHE = {};

commands.echo = async(term, args) => (term.log(args[0] || ''), true);
commands.clear = async(term) => term.clear();
commands.help = async(term) => {
    term.log(Object.keys(commands).sort().join(', '));
    return true;
};
commands.date = async(term) => (term.log(new Date().toLocaleString()), true);
        
    
/**
 * @link https://stackoverflow.com/a/5918791/18412379
 */
function getBrowser() {
    const ua = navigator.userAgent;
    let tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

commands.history = async(term, args) => {
    /* global TERM_HISTORY */
    term.log(
        TERM_HISTORY.map(
            (x, i) => `${(i + 1).toString().padEnd(TERM_HISTORY.length.toString().length)}  ${x}`
        )
            .slice(Number(args[0]) - 1 || 0)
            .join('\n')
    );
    return true;
};


commands.uwu = async(term, args) => {
    if (!args[0]) term.log('uwu');
    else {
        const faces = ['OwO', 'UwU', '>w<', 'uWu', ':3', 'ÙwÚ', 'QwQ', 'uwu', 'owo'];
        term.log(
            args[0]
                .toLowerCase()
                .replace(/[lr]/g, 'w')
                .replace(/[LR]/g, 'W')
                .replace(/n([aeiou])/g, 'ny$1')
                .replace(/N([aeiou])/g, 'Ny$1')
                .replace(/N([AEIOU])/g, 'Ny$1')
                .replace(/ove/g, 'uv')
                .replace(
                    /([!.,]+)/g,
                    (_, x) =>
                        ` ${faces[Math.floor(Math.random() * faces.length)]}${','.repeat(
                            x.length * ~~({'!': 2, '.': 1.5}[x[x.length - 1]] || 1) +
                                (x[x.length - 1] !== ',')
                        )}`
                )
        );
    }
    return true;
};

const sus = new Audio('assets/amogus.mp3');
commands.sus = async(term) => {
    commands.cat(term, ['/AMOGUS.txt']);
    await sus.play();
};



commands.tts = async(term, args) => {
    if (!args[0]) return term.log('tts: nothing to speak');
    const audio = new Audio(
        `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
            args.join(" ")
        )}&tl=en&client=tw-ob&ttsspeed=1`
    );
    await audio.play();
    return true;
};
