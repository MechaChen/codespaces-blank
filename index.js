const React = (function() {
    let hooks = [];
    let idx = 0;

    function useState(initVal) {
        const state = hooks[idx] || initVal;
        const _idx = idx;
        const setState = (newVal) => {
            hooks[_idx] = newVal;
        }
        
        idx += 1;

        return [state, setState];
    }

    function useEffect(cb, depArray) {
        // NOTE: get old dependecies by idx
        const oldDeps = hooks[idx];

        // NOTE: by default, cb should be called every time
        let hasChanged = true;

        // NOTE: if there exists one value in new dependencies not equal to old dependencies
        if (oldDeps) {
            hasChanged = depArray.some(
                (dep, i) => !Object.is(dep, oldDeps[i])
            )
        }

        if (hasChanged) {
            cb();
        }

        // should call cb
        // NOTE: store the new dependencies to hooks, and continue to next hook
        hooks[idx] = depArray;
        idx += 1
    }

    function render(Component) {
        idx = 0;
        const C = Component();
        C.render();
        return C;
    }

    return { useState, useEffect, render }
})();

function Component() {
    const [count, setCount] = React.useState(1);
    const [text, setText] = React.useState('apple');

    React.useEffect(() => {
        console.log('useEfect by Benson');
    }, [text]);

    return {
        render: () => console.log({ count, text }),
        click: () => setCount(count + 1),
        type: (text) => setText(text)
    }
}


var App = React.render(Component); // 2 次 useState, idx === 2

App.click(); // 將 count 設在 hooks[2] 
var App = React.render(Component); // 2 次 useState, idx === 4

App.type('pear'); // 將 'pear' 設在 hooks[4]
var App = React.render(Component); // 2 次 useState, idx === 6

